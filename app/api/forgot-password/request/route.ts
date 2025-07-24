import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  // TODO: Check if user exists, generate and send OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  console.log(`Send OTP ${otp} to ${email}`);

  // Save OTP to DB or cache (e.g., Redis) with expiry
  // await saveOTP(email, otp);

  return NextResponse.json({ success: true, message: 'OTP sent to email.' });
}
