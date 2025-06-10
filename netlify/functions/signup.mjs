import sql from './utils/db.mjs';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'طريقة غير مسموح بها' });
  }

  try {
    const { email, name, role, password } = req.body;
    
    if (!email || !name || !role) {
      return res.status(400).json({ error: 'البريد الإلكتروني والاسم والدور مطلوبة' });
    }

    // التحقق من وجود المستخدم
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ error: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    const adminEmail = 'admin@fitryne.com';
    let userRole = role;
    // دعم تسجيل المدير بكلمة مرور مشفرة
    if (email === adminEmail) {
      userRole = 'admin';
      if (!password) {
        return res.status(400).json({ error: 'كلمة المرور مطلوبة لحساب المدير' });
      }
      // تشفير كلمة المرور
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await sql`
        INSERT INTO users (email, name, role, password)
        VALUES (${email}, ${name}, ${userRole}, ${hashedPassword})
        RETURNING id, email, name, role, created_at
      `;
      return res.status(201).json({ user: newUser[0] });
    }

    // إنشاء المستخدم في قاعدة البيانات مع الدور (بدون كلمة مرور)
    const newUser = await sql`
      INSERT INTO users (email, name, role)
      VALUES (${email}, ${name}, ${userRole})
      RETURNING id, email, name, role, created_at
    `;

    return res.status(201).json({ user: newUser[0] });
  } catch (error) {
    console.error('خطأ في signup:', error);
    return res.status(500).json({ error: 'خطأ في الخادم الداخلي' });
  }
}