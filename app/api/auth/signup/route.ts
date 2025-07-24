import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if user already exists
    const { data: existingUsers, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .limit(1);

    if (fetchError) {
      console.error(fetchError);
      return NextResponse.json({ error: 'Error checking user' }, { status: 500 });
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ error: 'User exists' }, { status: 400 });
    }

    // Insert new user
    const { error: insertError } = await supabase.from('users').insert([
      {
        email,
        password: hashedPassword,
        name,
      },
    ]);

    if (insertError) {
      console.error(insertError);
      return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
