import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase'; // assumes Supabase client is exported as `db`

export async function POST(req: Request) {
  // const authHeader = req.headers.get('authorization') || '';
  // const token = authHeader.split(' ')[1];

  
  try {
    // const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const { newPassword,  email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.log("new",newPassword)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    

    const { error } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('email', email);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
