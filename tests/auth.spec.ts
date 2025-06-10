import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test('صفحة تسجيل الدخول تظهر وتعمل', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=تسجيل الدخول')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('صفحة التسجيل تظهر وتعمل', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('text=تسجيل')).toBeVisible();
  });

  test('حماية الصفحات الخاصة', async ({ page }) => {
    await page.goto('/dashboard');
    // يجب أن يتم إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك توكن
    await expect(page).toHaveURL(/login/);
  });

  test('تسجيل مستخدم جديد وتسجيل الدخول', async ({ page }) => {
    // تسجيل مستخدم جديد
    await page.goto('/register');
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'TestPassword123');
    await page.click('button[type="submit"]');
    // يفترض أن يتم التوجيه إلى صفحة تسجيل الدخول أو لوحة التحكم
    await expect(page).toHaveURL(/login|dashboard/);

    // تسجيل الدخول
    if (page.url().includes('login')) {
      await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
      await page.fill('input[name="password"]', 'TestPassword123');
      await page.click('button[type="submit"]');
      // يفترض أن يتم التوجيه إلى لوحة التحكم
      await expect(page).toHaveURL(/dashboard/);
    }
  });

  test('ظهور رسالة خطأ عند تسجيل الدخول بمعلومات خاطئة', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=خطأ')).toBeVisible();
  });
});