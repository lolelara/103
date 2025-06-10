import { test, expect } from '@playwright/test';

test.describe('FitRyne Integration', () => {
  test('صفحة تسجيل الدخول تظهر وتعمل', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await expect(page.locator('text=تسجيل الدخول')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('صفحة التسجيل تظهر وتعمل', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await expect(page.locator('text=تسجيل')).toBeVisible();
  });

  test('حماية الصفحات الخاصة', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    // يجب أن يتم إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك توكن
    await expect(page).toHaveURL(/login/);
  });

  test('تسجيل مستخدم جديد وتسجيل الدخول', async ({ page }) => {
    // تسجيل مستخدم جديد
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'TestPassword123');
    await page.click('button[type="submit"]');
    // يفترض أن يتم التوجيه إلى صفحة تسجيل الدخول أو لوحة التحكم
    await expect(page).toHaveURL(/login|dashboard/);

    // تسجيل الدخول
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'TestPassword123');
    await page.click('button[type="submit"]');
    // يفترض أن يتم التوجيه إلى لوحة التحكم
    await expect(page).toHaveURL(/dashboard/);
  });

  test('ظهور رسالة خطأ عند تسجيل الدخول بمعلومات خاطئة', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=خطأ')).toBeVisible();
  });
}); 