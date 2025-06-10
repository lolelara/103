import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { cookies } from 'next/headers';

// Create a connection pool
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_mdSgtJp8b4Yl@ep-dark-term-a5n1nxn8-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    // التحقق من أن الطلب يحتوي على JSON
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('[LOGIN] Invalid content-type:', contentType);
      return NextResponse.json(
        { message: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (jsonErr) {
      console.error('[LOGIN] Error parsing JSON body:', jsonErr);
      return NextResponse.json(
        { message: 'تعذر قراءة البيانات المرسلة (JSON parsing error)' },
        { status: 400 }
      );
    }
    const { email, password } = body;
    console.log('[LOGIN] Request body:', body);

    // التحقق من وجود البريد الإلكتروني وكلمة المرور
    if (!email || !password) {
      console.error('[LOGIN] Missing email or password:', { email, password });
      return NextResponse.json(
        { message: 'البريد الإلكتروني وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    try {
      // البحث عن المستخدم في قاعدة البيانات
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      const user = result.rows[0];
      console.log('[LOGIN] User from DB:', user);

      if (!user) {
        console.error('[LOGIN] User not found for email:', email);
        return NextResponse.json(
          { message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
          { status: 401 }
        );
      }

      // التحقق من كلمة المرور
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      console.log('[LOGIN] Password valid:', isValidPassword);

      if (!isValidPassword) {
        console.error('[LOGIN] Invalid password for user:', email);
        return NextResponse.json(
          { message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
          { status: 401 }
        );
      }

      // تحديث آخر تسجيل دخول
      await pool.query(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      );

      // إنشاء توكن JWT
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          userType: user.user_type || user.role,
          firebaseUid: user.firebase_uid
        },
        process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!',
        { expiresIn: '1d' }
      );

      // تخزين التوكن في الكوكيز
      cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400 // يوم واحد
      });

      return NextResponse.json({
        message: 'تم تسجيل الدخول بنجاح',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.user_type || user.role,
          phoneNumber: user.phone_number
        }
      });
    } catch (dbError: unknown) {
      let errorMessage = '[LOGIN] Database error:';
      let errorStack = '';
      if (typeof dbError === 'object' && dbError !== null) {
        if ('message' in dbError) errorMessage += ' ' + (dbError as any).message;
        if ('stack' in dbError) errorStack = (dbError as any).stack;
      }
      console.error(errorMessage);
      if (errorStack) console.error('[LOGIN] DB Error Stack:', errorStack);
      return NextResponse.json(
        { message: 'خطأ في الاتصال بقاعدة البيانات', error: errorMessage, stack: errorStack },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    let errorMessage = '[LOGIN] General error:';
    let errorStack = '';
    if (typeof error === 'object' && error !== null) {
      if ('message' in error) errorMessage += ' ' + (error as any).message;
      if ('stack' in error) errorStack = (error as any).stack;
    }
    console.error(errorMessage);
    if (errorStack) console.error('[LOGIN] Error Stack:', errorStack);
    return NextResponse.json(
      { message: 'حدث خطأ أثناء تسجيل الدخول', error: errorMessage, stack: errorStack },
      { status: 500 }
    );
  }
} 