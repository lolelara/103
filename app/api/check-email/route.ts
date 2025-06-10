import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    const result = await sql`
      SELECT email FROM users WHERE email = 'lolelarap@gmail.com';
    `;

    if (result.rows.length > 0) {
      return NextResponse.json({ exists: true, message: 'البريد الإلكتروني موجود في قاعدة البيانات' });
    } else {
      return NextResponse.json({ exists: false, message: 'البريد الإلكتروني غير موجود في قاعدة البيانات' });
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { message: 'حدث خطأ أثناء التحقق من قاعدة البيانات' },
      { status: 500 }
    );
  }
} 