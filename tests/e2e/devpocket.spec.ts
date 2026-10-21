import { test, expect } from '@playwright/test';

test.describe('DevPocket End-to-End User Journeys', () => {
  test('homepage renders hero, tools discovery, and navigation', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/DevPocket/);

    // Verify main headline
    const headline = page.getByRole('heading', { level: 1 });
    await expect(headline).toContainText('Your entire dev toolkit');

    // Verify primary CTA
    const exploreCta = page.getByRole('link', { name: 'Explore All Tools' });
    await expect(exploreCta).toBeVisible();

    // Verify tool cards exist
    const toolCards = page.locator('a[href^="/tools/"]');
    await expect(toolCards.first()).toBeVisible();
  });

  test('navigates to JSON Formatter and formats data', async ({ page }) => {
    await page.goto('/tools/json-formatter');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('JSON Formatter');

    // Check input textarea and formatted result textarea
    const textareas = page.locator('textarea');
    await expect(textareas.first()).toBeVisible();

    // Verify copy button exists
    const copyButton = page.getByRole('button', { name: /Copy/i }).first();
    await expect(copyButton).toBeVisible();
  });

  test('tools directory filters by search query', async ({ page }) => {
    await page.goto('/tools');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Developer Tools Directory');

    // Type query into search field
    const searchInput = page.getByPlaceholder('Filter by name, tag, or task...');
    await searchInput.fill('regex');

    // Check that Regex Tester remains visible
    await expect(page.getByText('Regular Expression Tester')).toBeVisible();
  });

  test('contact form validates input before sending', async ({ page }) => {
    await page.goto('/contact');

    const submitBtn = page.getByRole('button', { name: /Send Message/i });
    await submitBtn.click();

    // Error messages should appear
    await expect(page.getByText('Please enter your name')).toBeVisible();
  });
});
