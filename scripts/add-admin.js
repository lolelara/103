import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

async function addAdmin() {
  const email = 'lolelarap@gmail.com';
  const password = 'AdminPassword123'; // يمكنك تغيير كلمة المرور لاحقاً
  const hashedPassword = await bcrypt.hash(password, 10);
  const userType = 'admin';

  try {
    const result = await sql`
      INSERT INTO users (email, password, user_type)
      VALUES (${email}, ${hashedPassword}, ${userType})
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `;
    if (result.rows.length > 0) {
      console.log('تمت إضافة المدير بنجاح:', result.rows[0]);
    } else {
      console.log('المستخدم موجود بالفعل كمدير أو مستخدم عادي.');
    }
  } catch (error) {
    console.error('خطأ أثناء إضافة المدير:', error);
  }
}

addAdmin(); 