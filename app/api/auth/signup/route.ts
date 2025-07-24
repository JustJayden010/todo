import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existing = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'User exists' }, { status: 400 });
    }

    await db.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
      [email, hashedPassword, name]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
