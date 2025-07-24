import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const { data, error } = await supabase
      .from('todos')
      .select('id, title, deadline, completed')
      .eq('user_id', userId);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
    }

    return NextResponse.json({ todos: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
  }
}
