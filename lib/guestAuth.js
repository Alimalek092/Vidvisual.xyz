import { admin, weeklyUsage } from '@/lib/supabaseAdmin';

/**
 * Retrieves an existing guest user in Supabase auth or creates a lightweight
 * guest account so summaries can be persisted with foreign-key integrity.
 */
export async function getOrCreateGuestUser(guestId) {
  if (!guestId || typeof guestId !== 'string') return null;
  const cleanId = guestId.trim().replace(/[^a-zA-Z0-9-]/g, '').slice(0, 40);
  if (!cleanId) return null;

  const db = admin();
  const guestEmail = `guest_${cleanId}@guest.vidvisual.xyz`;

  // 1. Check if profile already exists for this guest
  const { data: existingProfile } = await db
    .from('profiles')
    .select('id, plan')
    .eq('email', guestEmail)
    .maybeSingle();

  if (existingProfile) {
    const used = await weeklyUsage(existingProfile.id);
    return {
      id: existingProfile.id,
      email: guestEmail,
      plan: existingProfile.plan || 'free',
      used,
      limit: 3,
      isGuest: true,
    };
  }

  // 2. If profile doesn't exist, create an anonymous guest user in Supabase auth
  const tempPassword = `VvGuest_${cleanId}_${Date.now()}!`;
  const { data: authData, error: authError } = await db.auth.admin.createUser({
    email: guestEmail,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { is_guest: true, guest_id: cleanId },
  });

  if (authError || !authData?.user) {
    console.warn('[Guest Auth] createUser notice:', authError?.message || 'checking existing auth list');
    // In case auth user was already registered but profile insertion was delayed
    const { data: listData } = await db.auth.admin.listUsers();
    const found = listData?.users?.find((u) => u.email === guestEmail);
    if (found) {
      await db.from('profiles').upsert({ id: found.id, email: guestEmail, plan: 'free' }).catch(() => {});
      const used = await weeklyUsage(found.id);
      return {
        id: found.id,
        email: guestEmail,
        plan: 'free',
        used,
        limit: 3,
        isGuest: true,
      };
    }
    return null;
  }

  const userId = authData.user.id;
  // Ensure profile exists in profiles table
  await db.from('profiles').upsert({ id: userId, email: guestEmail, plan: 'free' }).catch(() => {});

  return {
    id: userId,
    email: guestEmail,
    plan: 'free',
    used: 0,
    limit: 3,
    isGuest: true,
  };
}

/**
 * Transfers guest summaries to a newly authenticated user account so they keep their notes.
 */
export async function claimGuestSummaries(guestId, realUserId) {
  if (!guestId || !realUserId) return 0;
  const db = admin();
  const cleanId = guestId.trim().replace(/[^a-zA-Z0-9-]/g, '').slice(0, 40);
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
