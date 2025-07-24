import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  // TODO: Validate OTP from DB/cache
  const isValid = otp === '1234'; // Mock check. Replace with real check.

  if (!isValid) {
    return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
