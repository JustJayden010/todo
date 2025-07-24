import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const { title, deadline } = await req.json();

    const result = await db.query(
      'INSERT INTO todos (user_id, title, deadline) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, deadline]
    );

    return NextResponse.json({ todo: result.rows[0] });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error adding todo' }, { status: 500 });
  }
}
