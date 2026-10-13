import { expect, test } from '@playwright/test'

const screenIds = ['release', 'ritual', 'curator-close']

for (const width of [320, 375, 768, 1440]) {
  test(`three-screen home is readable without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.locator('main > section').evaluateAll(sections => sections.map(section => section.id))).toEqual(screenIds)
    await expect(page.locator('#ritual li')).toHaveCount(3)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    for (const id of screenIds) {
      const section = page.locator(`#${id}`)
      await section.scrollIntoViewIfNeeded()
      await section.screenshot({ path: `test-results/three-screen-${id}-${width}.png`, animations: 'disabled' })
    }
  })
}

test('both calls to action open the same honest preorder dialog', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /заказать.*4 900/i }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('heading', { name: 'Оставить заявку' })).toBeVisible()
  await dialog.getByLabel('Имя').fill('Рита')
  await dialog.getByLabel('Telegram').fill('@rita')
  await dialog.getByRole('checkbox').check()
  await dialog.getByRole('button', { name: 'Оставить заявку' }).click()
  await expect(dialog.getByRole('alert')).toHaveText('Заявки пока не принимаются')
  await expect(dialog.getByLabel('Telegram')).toHaveValue('@rita')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await page.locator('#curator-close').getByRole('button', { name: 'Выбрать выпуск №001' }).click()
  await expect(dialog.getByRole('heading', { name: 'Оставить заявку' })).toBeVisible()
  await expect(dialog.locator('input[type="card"], input[name*="card" i]')).toHaveCount(0)
})
