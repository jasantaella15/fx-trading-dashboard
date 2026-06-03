import { test, expect } from '@playwright/test';

const SEO_DESCRIPTION =
  'Track foreign exchange markets with interactive price charts, market filters, and current trading insights.';

test('sets the SEO page title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Trading Dashboard');
});

test('includes SEO metadata', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    SEO_DESCRIPTION,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', '/');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#09090b');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Trading Dashboard',
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    SEO_DESCRIPTION,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', '/');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    'content',
    'Trading Dashboard',
  );
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
    'content',
    SEO_DESCRIPTION,
  );
});
