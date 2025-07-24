import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const result = await db.query(
      'SELECT id, title, deadline, completed FROM todos WHERE user_id = $1',
      [userId]
    );

    return NextResponse.json({ todos: result.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
  }
}
