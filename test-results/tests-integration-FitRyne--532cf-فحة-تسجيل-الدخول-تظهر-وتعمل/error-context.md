# Test info

- Name: FitRyne Integration >> صفحة تسجيل الدخول تظهر وتعمل
- Location: C:\Users\NoteBook\Desktop\FitRyne wep\tests\integration.spec.ts:4:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

    at C:\Users\NoteBook\Desktop\FitRyne wep\tests\integration.spec.ts:5:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('FitRyne Integration', () => {
   4 |   test('صفحة تسجيل الدخول تظهر وتعمل', async ({ page }) => {
>  5 |     await page.goto('http://localhost:3000/login');
     |                ^ Error: page.goto: Target page, context or browser has been closed
   6 |     await expect(page.locator('text=تسجيل الدخول')).toBeVisible();
   7 |     await expect(page.locator('input[name="email"]')).toBeVisible();
   8 |     await expect(page.locator('input[name="password"]')).toBeVisible();
   9 |   });
  10 |
  11 |   test('صفحة التسجيل تظهر وتعمل', async ({ page }) => {
  12 |     await page.goto('http://localhost:3000/register');
  13 |     await expect(page.locator('text=تسجيل')).toBeVisible();
  14 |   });
  15 |
  16 |   test('حماية الصفحات الخاصة', async ({ page }) => {
  17 |     await page.goto('http://localhost:3000/dashboard');
  18 |     // يجب أن يتم إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك توكن
  19 |     await expect(page).toHaveURL(/login/);
  20 |   });
  21 |
  22 |   test('تسجيل مستخدم جديد وتسجيل الدخول', async ({ page }) => {
  23 |     // تسجيل مستخدم جديد
  24 |     await page.goto('http://localhost:3000/register');
  25 |     await page.fill('input[name="email"]', 'testuser@example.com');
  26 |     await page.fill('input[name="password"]', 'TestPassword123');
  27 |     await page.click('button[type="submit"]');
  28 |     // يفترض أن يتم التوجيه إلى صفحة تسجيل الدخول أو لوحة التحكم
  29 |     await expect(page).toHaveURL(/login|dashboard/);
  30 |
  31 |     // تسجيل الدخول
  32 |     await page.goto('http://localhost:3000/login');
  33 |     await page.fill('input[name="email"]', 'testuser@example.com');
  34 |     await page.fill('input[name="password"]', 'TestPassword123');
  35 |     await page.click('button[type="submit"]');
  36 |     // يفترض أن يتم التوجيه إلى لوحة التحكم
  37 |     await expect(page).toHaveURL(/dashboard/);
  38 |   });
  39 |
  40 |   test('ظهور رسالة خطأ عند تسجيل الدخول بمعلومات خاطئة', async ({ page }) => {
  41 |     await page.goto('http://localhost:3000/login');
  42 |     await page.fill('input[name="email"]', 'wrong@example.com');
  43 |     await page.fill('input[name="password"]', 'wrongpassword');
  44 |     await page.click('button[type="submit"]');
  45 |     await expect(page.locator('text=خطأ')).toBeVisible();
  46 |   });
  47 | }); 
```