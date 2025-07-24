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
    const { id, completed } = await req.json();

    const { data, error } = await supabase
      .from('todos')
      .update({ completed })
      .match({ id, user_id: userId })
      .select(); // needed to check if anything was updated

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error updating todo' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Todo not found or not yours' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating todo' }, { status: 500 });
  }
}
