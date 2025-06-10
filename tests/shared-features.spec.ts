import { test, expect } from '@playwright/test';

test.describe('Shared Features Tests', () => {
  // Login before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'user@fitryne.com'); // Use a known user account
    await page.fill('input[name="password"]', 'UserPassword123'); // Use the correct password
    await page.click('button[type="submit"]');
    // Verify we're on the dashboard
    await expect(page).toHaveURL(/dashboard/);
  });

  test('حاسبة السعرات الحرارية - حساب السعرات', async ({ page }) => {
    // Navigate to calorie calculator
    await page.click('text=حاسبة السعرات');
    
    // Fill calculator form
    await page.fill('input[name="age"]', '30');
    await page.fill('input[name="weight"]', '70');
    await page.fill('input[name="height"]', '175');
    await page.selectOption('select[name="gender"]', 'male');
    await page.selectOption('select[name="activityLevel"]', 'moderate');
    await page.selectOption('select[name="goal"]', 'maintain');
    await page.click('button[type="submit"]');
    
    // Verify result is displayed
    await expect(page.locator('.calorie-result')).toBeVisible();
  });

  test('الملف الشخصي - تحديث المعلومات', async ({ page }) => {
    // Navigate to profile
    await page.click('text=الملف الشخصي');
    
    // Update profile information
    await page.fill('input[name="name"]', 'اسم مستخدم معدل');
    await page.fill('input[name="phone"]', '0501234567');
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=تم تحديث الملف الشخصي بنجاح')).toBeVisible();
  });

  test('الإشعارات - عرض الإشعارات', async ({ page }) => {
    // Click on notifications icon
    await page.click('.notifications-icon');
    
    // Verify notifications panel is visible
    await expect(page.locator('.notifications-panel')).toBeVisible();
  });
});