import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, newPassword } = await req.json();

  // TODO: Hash new password & update DB
  console.log(`Reset password for ${email} to ${newPassword}`);

  return NextResponse.json({ success: true, message: 'Password reset successful' });
}
