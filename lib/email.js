import nodemailer from 'nodemailer';

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'vidvisual.xyz@gmail.com';

/**
 * Sends an email notification to the SaaS owner whenever someone buys
 * a paid plan (Pro, Unlimited, Team).
 */
export async function sendAdminPurchaseNotification({
  customerEmail,
  customerName,
  plan,
  amount = '',
  currency = 'USD',
  orderId = '',
  eventType = '',
}) {
  const normalizedPlan = (plan || 'Premium').toUpperCase();
  const displayName = customerName || (customerEmail ? customerEmail.split('@')[0] : 'New Customer');
  const displayEmail = customerEmail || 'Not provided';
  const displayAmount = amount || 'Standard pricing';
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'medium',
  }) + ' UTC';

  const subject = `🎉 New Sale! ${displayName} just bought Vid Visual ${normalizedPlan}`;

  const textContent = `
New Premium Purchase on Vid Visual!
===================================
Plan: ${normalizedPlan}
Customer Name: ${displayName}
Customer Gmail / Email: ${displayEmail}
Amount Paid: ${displayAmount}
Date & Time: ${timestamp}
Order / Reference ID: ${orderId || 'N/A'}
Trigger Event: ${eventType || 'Payment Success'}

View in Polar Dashboard: https://dashboard.polar.sh
View in Supabase: https://supabase.com/dashboard
`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Vid Visual Premium Sale</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1329; margin: 0; padding: 32px 16px; color: #ffffff; }
    .container { max-width: 580px; margin: 0 auto; background: #111c38; border-radius: 16px; border: 1px solid #1e294b; overflow: hidden; box-shadow: 0 12px 36px rgba(0,0,0,0.4); }
    .header { background: linear-gradient(135deg, #0f1f4d 0%, #050d24 100%); padding: 32px 28px; text-align: center; border-bottom: 1px solid #233363; }
    .badge { display: inline-block; background: #00f2fe; color: #050d24; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 12px; border-radius: 999px; margin-bottom: 12px; }
    .title { font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 8px; }
    .subtitle { font-size: 14px; color: #94a3b8; margin: 0; }
    .body { padding: 32px 28px; }
    .hero-stat { background: #0b152d; border-radius: 12px; padding: 20px; border: 1px solid #1e2c56; margin-bottom: 24px; text-align: center; }
    .hero-stat-label { font-size: 12px; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; margin-bottom: 4px; }
    .hero-stat-value { font-size: 32px; font-weight: 900; color: #4ade80; margin: 0; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    .info-table td { padding: 12px 14px; font-size: 14px; border-bottom: 1px solid #1b284e; }
    .info-table td.label { width: 40%; color: #94a3b8; font-weight: 500; }
    .info-table td.val { color: #f8fafc; font-weight: 600; text-align: right; }
    .highlight-email { color: #38bdf8 !important; text-decoration: underline; }
    .highlight-plan { display: inline-block; background: #4f46e5; color: #ffffff; padding: 2px 10px; border-radius: 6px; font-weight: 700; }
    .btn-container { text-align: center; margin: 28px 0 12px; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 10px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4); }
    .footer { background: #091024; padding: 20px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #172445; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">Vid Visual • Instant Payment Alert</span>
      <h1 class="title">New Premium Customer!</h1>
      <p class="subtitle">A customer just upgraded on <a href="https://vidvisual.xyz" style="color: #38bdf8; text-decoration: none; font-weight: 600;">Vid Visual</a></p>
    </div>
    <div class="body">
      <div class="hero-stat">
        <div class="hero-stat-label">Plan Upgraded</div>
        <div class="hero-stat-value"><span class="highlight-plan">${normalizedPlan}</span></div>
      </div>
      <table class="info-table">
        <tr>
          <td class="label">Customer Name</td>
          <td class="val">${displayName}</td>
        </tr>
        <tr>
          <td class="label">Customer Gmail / Email</td>
          <td class="val"><a href="mailto:${displayEmail}" class="highlight-email">${displayEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Amount Paid</td>
          <td class="val" style="color: #4ade80;">${displayAmount}</td>
        </tr>
        <tr>
          <td class="label">Time (UTC)</td>
          <td class="val" style="font-size: 13px;">${timestamp}</td>
        </tr>
        <tr>
          <td class="label">Reference / Order ID</td>
          <td class="val" style="font-family: monospace; font-size: 12px; color: #94a3b8;">${orderId || 'N/A'}</td>
        </tr>
      </table>
      <div class="btn-container">
        <a href="https://dashboard.polar.sh" class="btn" target="_blank">Open Polar Dashboard &rarr;</a>
      </div>
    </div>
    <div class="footer">
      This notification was automatically dispatched to <strong>${ADMIN_EMAIL}</strong> by Vid Visual payment systems.
    </div>
  </div>
</body>
</html>
`;

  // 1. Try Gmail SMTP / Google App Password (via Nodemailer)
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const smtpUser = process.env.SMTP_USER || 'vidvisual.xyz@gmail.com';

  if (gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: gmailPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Vid Visual Billing" <${smtpUser}>`,
        to: ADMIN_EMAIL,
        subject,
        text: textContent,
        html: htmlContent,
      });

      console.log('[Email Alert] Purchase notification sent via Gmail SMTP:', info.messageId);
      return { success: true, provider: 'gmail-smtp', messageId: info.messageId };
    } catch (err) {
      console.error('[Email Alert] Gmail SMTP error:', err.message);
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Vid Visual <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject,
          text: textContent,
          html: htmlContent,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        console.log('[Email Alert] Purchase notification sent via Resend API:', json.id);
        return { success: true, provider: 'resend', messageId: json.id };
      } else {
        console.error('[Email Alert] Resend API error response:', json);
      }
    } catch (err) {
      console.error('[Email Alert] Resend API fetch error:', err.message);
    }
  }

  // 3. Fallback / Log notification if no email service key is set yet
  console.warn('[Email Alert] Notice: To receive live emails at ' + ADMIN_EMAIL + ', set GMAIL_APP_PASSWORD (recommended) or RESEND_API_KEY in your Vercel Environment Variables.');
  console.log('[Email Alert] Sale Details Captured:', {
    displayName,
    displayEmail,
    plan: normalizedPlan,
    amount: displayAmount,
    timestamp,
    orderId,
  });

  return { success: false, reason: 'No email credentials configured' };
}
