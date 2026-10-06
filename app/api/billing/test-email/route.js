import { NextResponse } from 'next/server';
import { sendAdminPurchaseNotification, sendUserLimitUpgradeEmail } from '@/lib/email';

export async function GET(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'purchase'; // 'purchase' or 'limit'
  const plan = url.searchParams.get('plan') || 'Pro';
  const name = url.searchParams.get('name') || 'Alex Johnson';
  const email = url.searchParams.get('email') || 'vidvisual.xyz@gmail.com';

  try {
    if (type === 'limit') {
      const result = await sendUserLimitUpgradeEmail({
        recipientEmail: email,
        recipientName: name,
        plan: 'free',
        weeklyLimit: 3,
        proWeeklyLimit: 50,
      });

      return NextResponse.json({
        type: 'user_limit_upgrade',
        recipient: email,
        success: result.success,
        provider: result.provider || null,
        message: result.success
          ? `Limit upgrade email successfully dispatched to ${email}!`
          : `Email service not yet configured. Please set GMAIL_APP_PASSWORD (recommended) or RESEND_API_KEY in Vercel.`,
        result,
      });
    }

    const result = await sendAdminPurchaseNotification({
      customerEmail: email,
      customerName: name,
      plan,
      amount: '$9.00 USD',
      currency: 'USD',
      orderId: 'test_order_' + Date.now(),
      eventType: 'order.created',
    });

    return NextResponse.json({
      type: 'admin_purchase_alert',
      recipient: 'vidvisual.xyz@gmail.com',
      success: result.success,
      provider: result.provider || null,
      message: result.success
        ? `Test purchase notification successfully dispatched to vidvisual.xyz@gmail.com!`
        : `Email service not yet configured. Please set GMAIL_APP_PASSWORD (recommended) or RESEND_API_KEY in Vercel.`,
      result,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
