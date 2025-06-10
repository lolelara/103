import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard Tests', () => {
  // Login as admin before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@fitryne.com'); // Use a known admin account
    await page.fill('input[name="password"]', 'AdminPassword123'); // Use the correct password
    await page.click('button[type="submit"]');
    // Verify we're on the dashboard
    await expect(page).toHaveURL(/dashboard/);
  });

  test('إدارة المستخدمين - عرض قائمة المستخدمين', async ({ page }) => {
    // Navigate to user management
    await page.click('text=إدارة المستخدمين');
    await expect(page.locator('text=قائمة المستخدمين')).toBeVisible();
    // Check if user table is visible
    await expect(page.locator('table')).toBeVisible();
  });

  test('إدارة الخطط - إضافة خطة جديدة', async ({ page }) => {
    // Navigate to plan management
    await page.click('text=إدارة الخطط');
    await page.click('text=إضافة خطة جديدة');
    
    // Fill plan form
    await page.fill('input[name="name"]', 'خطة اختبار');
    await page.fill('textarea[name="description"]', 'وصف خطة الاختبار');
    await page.fill('input[name="price"]', '100');
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=تم إضافة الخطة بنجاح')).toBeVisible();
  });

  test('إدارة الإشعارات - إرسال إشعار جديد', async ({ page }) => {
    // Navigate to notifications
    await page.click('text=الإشعارات');
    await page.click('text=إرسال إشعار جديد');
    
    // Fill notification form
    await page.fill('input[name="title"]', 'إشعار اختبار');
    await page.fill('textarea[name="message"]', 'محتوى إشعار الاختبار');
    await page.selectOption('select[name="userType"]', 'all');
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=تم إرسال الإشعار بنجاح')).toBeVisible();
  });

  test('إدارة التقييمات - عرض التقييمات', async ({ page }) => {
    // Navigate to ratings
    await page.click('text=التقييمات');
    
    // Verify ratings table is visible
    await expect(page.locator('table')).toBeVisible();
  });
});