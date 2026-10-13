import crypto from 'crypto';
import { admin } from '@/lib/supabaseAdmin';

/**
 * Generates a bulletproof server-side hardware/network fingerprint.
 * Prevents users from bypassing limits by clearing cookies, refreshing,
 * or using Incognito tabs on the same device.
 */
export function getDeviceFingerprint(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : request.headers.get('x-real-ip') || request.headers.get('cf-connecting-ip') || '127.0.0.1';

  const userAgent = request.headers.get('user-agent') || 'unknown-ua';
  const acceptLang = (request.headers.get('accept-language') || '').slice(0, 8);

  const raw = `${ip}::${userAgent}::${acceptLang}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 32);
}

/**
 * Calculates the exact reset time for "Every Monday at 00:00 UTC".
 */
export function getMondayResetInfo() {
  const now = new Date();
  const day = now.getUTCDay(); // 0 is Sunday, 1 is Monday...
  const diffToNextMonday = ((7 - day + 1) % 7) || 7;

  const nextMonday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + diffToNextMonday,
    0, 0, 0, 0
  ));

  const options = { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' };
  const formattedDate = nextMonday.toLocaleDateString('en-US', options);

  const msRemaining = nextMonday.getTime() - now.getTime();
  const daysRemaining = Math.floor(msRemaining / (24 * 60 * 60 * 1000));
  const hoursRemaining = Math.floor((msRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  const countdownText = daysRemaining > 0
    ? `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} and ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`
    : `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`;

  return {
    nextMondayISO: nextMonday.toISOString(),
    formattedDate, // e.g. "Monday, Oct 19"
    daysRemaining,
    hoursRemaining,
    countdownText,
  };
}

/**
 * Returns the timestamp for the most recent Monday 00:00 UTC to enforce
 * weekly reset cycles every Monday.
 */
export function getCurrentMondayStart() {
  const now = new Date();
  const day = now.getUTCDay(); // 0 is Sun, 1 is Mon...
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + diffToMonday,
    0, 0, 0, 0
  ));
  return monday.toISOString();
}

/**
 * Computes weekly usage from the current Monday 00:00 UTC.
 */
export async function weeklyUsageSinceMonday(userId) {
  if (!userId) return 0;
  const since = getCurrentMondayStart();
  const { count } = await admin()
    .from('summaries')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', since);
  return count || 0;
}

/**
 * Retrieves or initializes a bulletproof guest session in Supabase.
 * Uses both client-provided storage ID and the hardware/IP fingerprint
 * so users CANNOT bypass limits via Incognito or cookie clearing.
 */
export async function getOrCreateGuestUser(clientGuestId, deviceFingerprint) {
  // Primary identifier uses device fingerprint to guarantee Incognito/cookie-clear proofing
  const primaryKey = deviceFingerprint || clientGuestId;
  if (!primaryKey) return null;

  const cleanKey = primaryKey.trim().replace(/[^a-zA-Z0-9-]/g, '').slice(0, 32);
  const db = admin();
  const guestEmail = `guest_${cleanKey}@guest.vidvisual.xyz`;

  // 1. Look up existing profile
  const { data: existingProfile } = await db
    .from('profiles')
    .select('id, plan')
    .eq('email', guestEmail)
    .maybeSingle();

  if (existingProfile) {
    const used = await weeklyUsageSinceMonday(existingProfile.id);
    return {
      id: existingProfile.id,
      email: guestEmail,
      plan: existingProfile.plan || 'free',
      used,
      limit: 3,
      isGuest: true,
      guestKey: cleanKey,
    };
  }

  // 2. If client passed a different clientGuestId, check if THAT was used
  if (clientGuestId && clientGuestId !== cleanKey) {
    const altClean = clientGuestId.trim().replace(/[^a-zA-Z0-9-]/g, '').slice(0, 32);
    const altEmail = `guest_${altClean}@guest.vidvisual.xyz`;
    const { data: altProfile } = await db
      .from('profiles')
      .select('id, plan')
      .eq('email', altEmail)
      .maybeSingle();
    if (altProfile) {
      const used = await weeklyUsageSinceMonday(altProfile.id);
      return {
        id: altProfile.id,
        email: altEmail,
        plan: altProfile.plan || 'free',
        used,
        limit: 3,
        isGuest: true,
        guestKey: altClean,
      };
    }
  }

  // 3. Create anonymous guest user in Supabase Auth
  const tempPassword = `VvGuest_${cleanKey}_${Date.now()}!`;
  const { data: authData, error: authError } = await db.auth.admin.createUser({
    email: guestEmail,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { is_guest: true, device_fingerprint: cleanKey },
  });

  if (authError || !authData?.user) {
    console.warn('[Guest Auth] Checking existing user list for:', cleanKey);
    const { data: listData } = await db.auth.admin.listUsers();
    const found = listData?.users?.find((u) => u.email === guestEmail);
    if (found) {
      await db.from('profiles').upsert({ id: found.id, email: guestEmail, plan: 'free' }).catch(() => {});
      const used = await weeklyUsageSinceMonday(found.id);
      return {
        id: found.id,
        email: guestEmail,
        plan: 'free',
        used,
        limit: 3,
        isGuest: true,
        guestKey: cleanKey,
      };
    }
    return null;
  }

  const userId = authData.user.id;
  await db.from('profiles').upsert({ id: userId, email: guestEmail, plan: 'free' }).catch(() => {});

  return {
    id: userId,
    email: guestEmail,
    plan: 'free',
    used: 0,
    limit: 3,
    isGuest: true,
    guestKey: cleanKey,
  };
}

/**
 * Transfers guest summaries to an authenticated user when they log in or register.
 */
export async function claimGuestSummaries(guestId, realUserId) {
  if (!guestId || !realUserId) return 0;
  const db = admin();
  const cleanId = guestId.trim().replace(/[^a-zA-Z0-9-]/g, '').slice(0, 32);
  const guestEmail = `guest_${cleanId}@guest.vidvisual.xyz`;

  const { data: guestProfile } = await db.from('profiles').select('id').eq('email', guestEmail).maybeSingle();
  if (!guestProfile) return 0;

  const { data: updated, error } = await db
    .from('summaries')
    .update({ user_id: realUserId })
    .eq('user_id', guestProfile.id)
    .select('id');

  if (error) {
    console.error('[Guest Auth] Failed to claim summaries:', error.message);
    return 0;
  }

  return updated?.length || 0;
}
