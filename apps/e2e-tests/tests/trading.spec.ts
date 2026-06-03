import { expect, test, type Locator, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial', retries: 0 });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

const PRIMARY_SYMBOL = 'C:EURUSD';

async function selectPrimarySymbol(page: Page) {
  const primarySymbol = page.getByTestId('primary-symbol-combobox');

  await primarySymbol.click();
  await expect(page.getByRole('option').first()).toBeVisible({
    timeout: 30_000,
  });
  await page.getByTestId('primary-symbol-combobox-input').fill(PRIMARY_SYMBOL);

  const option = page.getByRole('option').first();
  await expect(option).toBeVisible({ timeout: 30_000 });
  await expect(option).toContainText(PRIMARY_SYMBOL);

  const selectedSymbol = await option.textContent();
  await option.click();

  return {
    primarySymbol,
    selectedSymbol: selectedSymbol?.trim() ?? '',
  };
}

async function expectLoadedTradingData(page: Page) {
  await expect(page.getByTestId('current-price')).not.toHaveText('--', { timeout: 30_000 });
  await expect(page.getByTestId('price-change')).not.toContainText('(--%)');
  await expect(page.getByTestId('price-chart')).toHaveAttribute('data-state', 'ready');
}

async function getText(locator: Locator) {
  return (await locator.textContent())?.trim() ?? '';
}

test('defaults the exchange select to FX', async ({ page }) => {
  await expect(page.getByTestId('exchange-select')).toContainText('FX');
});

test('shows price, percentage, and chart data after selecting a primary symbol', async ({ page }) => {
  await selectPrimarySymbol(page);

  await expectLoadedTradingData(page);
});

test('updates the percentage when switching time ranges', async ({ page }) => {
  await selectPrimarySymbol(page);
  await expectLoadedTradingData(page);

  const priceChange = page.getByTestId('price-change');
  const initialPriceChange = await getText(priceChange);

  await page.getByTestId('time-range-tab-1w').click();

  await expect.poll(() => getText(priceChange), { timeout: 30_000 }).not.toBe(initialPriceChange);
});

test('resets the primary symbol when the exchange changes', async ({ page }) => {
  const { primarySymbol, selectedSymbol } = await selectPrimarySymbol(page);
  await expect(primarySymbol).toContainText(selectedSymbol);

  await page.getByTestId('exchange-select').click();
  await page.getByTestId('exchange-option-crypto').click();

  await expect(primarySymbol).not.toContainText(selectedSymbol);
  await expect(page.getByTestId('current-price')).toHaveText('--');
});
