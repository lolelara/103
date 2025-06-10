import { test, expect } from '@playwright/test';

test.describe('Trainer Dashboard Tests', () => {
  // Login as trainer before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'trainer@fitryne.com'); // Use a known trainer account
    await page.fill('input[name="password"]', 'TrainerPassword123'); // Use the correct password
    await page.click('button[type="submit"]');
    // Verify we're on the dashboard
    await expect(page).toHaveURL(/dashboard/);
  });

  test('إدارة المتدربين - عرض قائمة المتدربين', async ({ page }) => {
    // Navigate to trainee management
    await page.click('text=المتدربين');
    await expect(page.locator('text=قائمة المتدربين')).toBeVisible();
    // Check if trainee table is visible
    await expect(page.locator('table')).toBeVisible();
  });

  test('إدارة الفيديوهات - رفع فيديو جديد', async ({ page }) => {
    // Navigate to video management
    await page.click('text=الفيديوهات');
    await page.click('text=إضافة فيديو جديد');
    
    // Fill video form
    await page.fill('input[name="title"]', 'فيديو اختبار');
    await page.fill('textarea[name="description"]', 'وصف فيديو الاختبار');
    // Mock file upload
    await page.setInputFiles('input[type="file"]', {
      name: 'test-video.mp4',
      mimeType: 'video/mp4',
      buffer: Buffer.from('test video content'),
    });
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=تم رفع الفيديو بنجاح')).toBeVisible();
  });

  test('إدارة ملفات التغذية - رفع ملف جديد', async ({ page }) => {
    // Navigate to nutrition files
    await page.click('text=ملفات التغذية');
    await page.click('text=إضافة ملف جديد');
    
    // Fill nutrition file form
    await page.fill('input[name="title"]', 'ملف تغذية اختبار');
    await page.fill('textarea[name="description"]', 'وصف ملف التغذية');
    // Mock file upload
    await page.setInputFiles('input[type="file"]', {
      name: 'test-nutrition.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('test nutrition content'),
    });
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=تم رفع الملف بنجاح')).toBeVisible();
  });

  test('إدارة الجداول - إنشاء جدول جديد', async ({ page }) => {
    // Navigate to schedules
    await page.click('text=الجداول');
    await page.click('text=إنشاء جدول جديد');
    
    // Fill schedule form
    await page.fill('input[name="title"]', 'جدول اختبار');
    await page.selectOption('select[name="traineeId"]', { index: 1 }); // Select first trainee
    await page.fill('input[name="date"]', '2023-12-31');
    await page.fill('textarea[name="description"]', 'وصف الجدول');
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=تم إنشاء الجدول بنجاح')).toBeVisible();
  });

  test('المحادثات - إرسال رسالة', async ({ page }) => {
    // Navigate to chat
    await page.click('text=المحادثات');
    
    // Select first conversation
    await page.click('.conversation-list >> nth=0');
    
    // Send a message
    await page.fill('textarea[name="message"]', 'رسالة اختبار');
    await page.click('button[type="submit"]');
    
    // Verify message appears in chat
    await expect(page.locator('text=رسالة اختبار')).toBeVisible();
  });
});