import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.split(' ')[1];

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const { id, completed } = await req.json();

    // Update only if the todo belongs to the logged-in user
    const result = await db.query(
      'UPDATE todos SET completed = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [completed, id, userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Todo not found or not yours' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating todo' }, { status: 500 });
  }
}
