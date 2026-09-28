import { NextResponse } from 'next/server';
import { getUser, admin } from '@/lib/supabaseAdmin';

export async function GET(request) {
  const user = await getUser(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Please log in to your account first at https://vidvisual.xyz/login' },
      { status: 401 }
    );
  }

  const db = admin();
  const { error } = await db
    .from('profiles')
    .update({ plan: 'free' })
    .eq('id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: `Account ${user.email} successfully reset to Free plan.`,
    user_id: user.id,
    plan: 'free',
  });
}

export async function POST(request) {
  const user = await getUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Please log in first.' }, { status: 401 });
  }

  const db = admin();
  await db.from('profiles').update({ plan: 'free' }).eq('id', user.id);
  return NextResponse.json({ success: true, plan: 'free' });
}
