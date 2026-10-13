import { NextResponse } from 'next/server';
import { sendUserLimitUpgradeEmail } from '@/lib/email';
import { admin } from '@/lib/supabaseAdmin';

export async function POST(request) {
  try {
    const { email, name } = await request.json().catch(() => ({}));
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Trigger inspiring upgrade & recalling email from vidvisual.xyz@gmail.com
    const emailResult = await sendUserLimitUpgradeEmail({
      recipientEmail: cleanEmail,
      recipientName: name || '',
      plan: 'free',
      weeklyLimit: 3,
      proWeeklyLimit: 50,
    });

    // Optionally record or update lead interest in profiles
    try {
      const db = admin();
      await db
        .from('profiles')
        .update({ last_upgrade_email_at: new Date().toISOString() })
        .eq('email', cleanEmail);
    } catch {
      // Non-critical if user does not have a profile yet
    }

    return NextResponse.json({
      success: true,
      message: 'Upgrade email sent! Check your inbox.',
      provider: emailResult.provider || 'queued',
    });
  } catch (error) {
    console.error('[Recall Limit API Error]:', error);
    return NextResponse.json({ error: 'Could not send email. Please try again.' }, { status: 500 });
  }
}
