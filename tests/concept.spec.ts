import {test, expect} from '@playwright/test';

for (const width of [360, 390, 1440]) {
  test(`footer concept tools work at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    await page.goto('/');
    const trigger = page.getByRole('button', {name: 'Explore the concept', exact: true});
    await trigger.click();
    const dialog = page.getByRole('dialog', {name: 'Explore the concept'});
    await expect(dialog).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(await page.evaluate(() => document.getElementById('root')?.inert)).toBe(true);
    for (const [day, dish] of [['Monday', 'Chicken Parmesan'], ['Wednesday', 'Liver & Onions'], ['Thursday', 'Perogies'], ['Sunday', 'Your favourites, all week long.']]) {
      await dialog.getByRole('button', {name: day, exact: true}).click();
      await expect(dialog.getByRole('button', {name: day, exact: true})).toHaveAttribute('aria-pressed', 'true');
      await expect(dialog.locator('.concept-preview')).toContainText(dish);
    }
    expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await dialog.getByRole('button', {name: 'Use the actual Toronto day'}).click();
    await expect(dialog.getByRole('status')).toContainText('actual day in Toronto');
    await dialog.getByRole('button', {name: 'Reset cart & booking demo'}).click();
    await expect(dialog.getByRole('status')).toContainText('Demo states reset');
    await expect(dialog.getByRole('button', {name: 'Close dialog'})).toBeInViewport();
    await dialog.screenshot({path: `qa/concept-${width}.png`});
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.getElementById('root')?.inert)).toBe(false);
    await trigger.click();
    await page.getByRole('dialog').getByRole('link', {name: /Try pickup ordering/}).click();
    await expect(page).toHaveURL(/\/order$/);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await trigger.click();
    await page.getByRole('dialog').getByRole('link', {name: /Try reservations/}).click();
    await expect(page).toHaveURL(/\/reservations$/);
    await expect(page.getByLabel('Party size')).toBeVisible();
  });
}

test('dialog traps focus and backdrop dismisses without resetting the selected day', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name: 'Explore the concept', exact: true}).click();
  const dialog = page.getByRole('dialog');
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', {name: 'Reset cart & booking demo'})).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', {name: 'Close dialog'})).toBeFocused();
  await dialog.getByRole('button', {name: 'Thursday', exact: true}).click();
  await page.locator('.overlay').click({position: {x: 3, y: 3}});
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('.special-panel')).toContainText('Veal Parmesan');
});

test('reduced-motion visitors see sections and can use the footer panel', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toBeVisible();
  await expect(page.locator('.hero-copy')).not.toHaveCSS('opacity', '0');
  await page.getByRole('button', {name: 'Explore the concept', exact: true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', {name: 'Thursday', exact: true}).click();
  await expect(page.locator('.concept-preview')).toContainText('Perogies');
  await page.getByRole('button', {name: 'Close dialog'}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
