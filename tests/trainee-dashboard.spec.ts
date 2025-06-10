import { test, expect } from '@playwright/test';

test.describe('Trainee Dashboard Tests', () => {
  // Login as trainee before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'trainee@fitryne.com'); // Use a known trainee account
    await page.fill('input[name="password"]', 'TraineePassword123'); // Use the correct password
    await page.click('button[type="submit"]');
    // Verify we're on the dashboard
    await expect(page).toHaveURL(/dashboard/);
  });

  test('عرض الفيديوهات - مشاهدة فيديو', async ({ page }) => {
    // Navigate to videos
    await page.click('text=الفيديوهات');
    
    // Click on first video
    await page.click('.video-card >> nth=0');
    
    // Verify video player is visible
    await expect(page.locator('video')).toBeVisible();
  });

  test('عرض ملفات التغذية - تنزيل ملف', async ({ page }) => {
    // Navigate to nutrition files
    await page.click('text=ملفات التغذية');
    
    // Click on first file
    const downloadPromise = page.waitForEvent('download');
    await page.click('.file-card >> nth=0 >> text=تنزيل');
    const download = await downloadPromise;
    
    // Verify download started
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('عرض الجدول - التحقق من وجود الجدول', async ({ page }) => {
    // Navigate to schedule
    await page.click('text=الجدول');
    
    // Verify schedule is visible
    await expect(page.locator('.schedule-container')).toBeVisible();
  });

  test('المحادثات - إرسال رسالة للمدرب', async ({ page }) => {
    // Navigate to chat
    await page.click('text=المحادثات');
    
    // Select trainer conversation
    await page.click('.conversation-list >> text=المدرب');
    
    // Send a message
    await page.fill('textarea[name="message"]', 'رسالة اختبار من المتدرب');
    await page.click('button[type="submit"]');
    
    // Verify message appears in chat
    await expect(page.locator('text=رسالة اختبار من المتدرب')).toBeVisible();
  });

  test('التقييمات - إضافة تقييم جديد', async ({ page }) => {
    // Navigate to ratings
    await page.click('text=التقييمات');
    await page.click('text=إضافة تقييم جديد');
    
    // Fill rating form
    await page.selectOption('select[name="trainerName"]', { index: 0 }); // Select first trainer
    await page.click('.star-rating >> nth=4'); // 5-star rating
    await page.fill('textarea[name="comment"]', 'تعليق اختبار للتقييم');
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('text=تم إضافة التقييم بنجاح')).toBeVisible();
  });
});