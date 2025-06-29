<<<<<<< HEAD
# FitRyne
Fitness Training Platform
=======
# Fitryne - منصة التدريب الرياضي

منصة متكاملة للتدريب الرياضي تربط بين المدربين والمتدربين، مع دعم كامل للغة العربية.

## المميزات

- نظام تسجيل للمدربين والمتدربين
- إدارة البرامج التدريبية
- متابعة التقدم والقياسات
- خطط تغذية متكاملة
- نظام تقييمات ومراجعات
- دعم كامل للغة العربية
- واجهة مستخدم عصرية

## المتطلبات التقنية

- Node.js (v18 أو أحدث)
- PostgreSQL
- npm أو yarn

## التثبيت

1. استنسخ المستودع:
```bash
git clone [رابط-المستودع]
cd fitryne
```

2. ثبت المتطلبات:
```bash
npm install
```

3. أنشئ ملف `.env` وأضف المتغيرات المطلوبة:
```
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

4. شغل الهجرات:
```bash
node scripts/run-migration.js
```

5. شغل المشروع:
```bash
npm run dev
```

## المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:
1. افتح Issue جديد
2. اعمل Fork للمشروع
3. أنشئ فرع جديد لميزتك
4. قدم Pull Request

## الترخيص

MIT
>>>>>>> 1c182006 (Initial commit: Project setup with database schema)
