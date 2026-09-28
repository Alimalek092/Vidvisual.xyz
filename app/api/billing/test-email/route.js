import { NextResponse } from 'next/server';
import { sendAdminPurchaseNotification } from '@/lib/email';

export async function GET(request) {
  const url = new URL(request.url);
  const plan = url.searchParams.get('plan') || 'Pro';
  const name = url.searchParams.get('name') || 'Alex Johnson';
  const email = url.searchParams.get('email') || 'alex.johnson@gmail.com';

  try {
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
