import { sql } from '@vercel/postgres';

async function checkEmail() {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = 'lolelarap@gmail.com';
    `;
    
    console.log('نتيجة البحث:', result.rows);
    
    if (result.rows.length > 0) {
      console.log('البريد الإلكتروني موجود في قاعدة البيانات');
      console.log('معلومات المستخدم:', result.rows[0]);
    } else {
      console.log('البريد الإلكتروني غير موجود في قاعدة البيانات');
    }
  } catch (error) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', error);
  }
}

checkEmail(); 