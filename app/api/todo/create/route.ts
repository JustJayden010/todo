import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const { title, deadline } = await req.json();

    const { data, error } = await supabase
      .from('todos')
      .insert([{ user_id: userId, title, deadline }])
      .select()
      .single(); // Return the inserted row

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to insert todo' }, { status: 500 });
    }

    return NextResponse.json({ todo: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error adding todo' }, { status: 500 });
  }
}
