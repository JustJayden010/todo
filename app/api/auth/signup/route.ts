import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single(); // Get a single user

  if (error || !user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  return NextResponse.json({
    success: true,
    token,
    email: user.email,
    name: user.name,
  });
}
