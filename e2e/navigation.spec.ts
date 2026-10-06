import { expect, test } from '@playwright/test'

const legalRoutes = [
  ['/legal/requisites', 'Реквизиты'],
  ['/legal/privacy', 'Политика конфиденциальности'],
  ['/legal/terms', 'Условия продажи и возврата'],
  ['/legal/delivery', 'Доставка и оплата'],
] as const

const publicRoutes = [
  ['/', 'BOOK FOR YOU'],
  ['/edition/001', 'Название книги будет объявлено'],
  ['/collection', 'Коллекция'],
] as const

for (const [path, heading] of publicRoutes) {
  test(`direct route ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  })
}

for (const [path, heading] of legalRoutes) {
  test(`direct route ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    await expect(page.getByText('Информация будет опубликована к запуску продаж.')).toBeVisible()
    await expect(page.locator('main')).not.toContainText(/ИНН|ОГРН/i)
  })
}

test('header and footer navigate to every published route', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Разделы сайта' }).getByRole('link', { name: 'STORY' }).click()
  await expect(page).toHaveURL(/\/edition\/001$/)
  await expect(page.getByRole('button', { name: /купить|заказать/i })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /купить|заказать/i })).toHaveCount(0)

  await page.getByRole('navigation', { name: 'Разделы сайта' }).getByRole('link', { name: 'COLLECTION' }).click()
  await expect(page).toHaveURL(/\/collection$/)

  for (const [path, heading] of legalRoutes) {
    await page.getByRole('navigation', { name: 'Юридическая информация' }).getByRole('link', { name: heading }).click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
  }

  await page.getByRole('link', { name: 'BOOKFORYOU — главная' }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('mobile menu navigation remains reachable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Меню' })
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('navigation', { name: 'Основная навигация' }).getByRole('link', { name: 'STORY' }).click()
  await expect(page).toHaveURL(/\/edition\/001$/)
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByRole('heading', { level: 1, name: 'Название книги будет объявлено' })).toBeFocused()
})

test('mobile collection card opens the edition at its focused heading', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/collection')
  const link = page.getByRole('link', { name: 'Узнать о выпуске' })
  await link.scrollIntoViewIfNeeded()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  await link.click()
  await expect(page).toHaveURL(/\/edition\/001$/)
  const heading = page.getByRole('heading', { level: 1, name: 'Название книги будет объявлено' })
  await expect(heading).toBeFocused()
  await expect(heading).toBeInViewport()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

  await page.goBack()
  await expect(page.getByRole('heading', { level: 1, name: 'Коллекция' })).toBeFocused()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('GIFT navigation opens and focuses the gift section', async ({ page }) => {
  await page.goto('/collection')
  await page.getByRole('navigation', { name: 'Разделы сайта' }).getByRole('link', { name: 'GIFT' }).click()
  await expect(page).toHaveURL(/\/#gift$/)
  const gift = page.locator('#gift')
  await expect(gift).toBeInViewport()
  await expect(gift.getByRole('heading', { name: 'BOOKFORYOU для другого' })).toBeFocused()

  await page.goto('/#gift')
  await expect(gift).toBeInViewport()
})
