import { expect, test } from '@playwright/test'

const legalRoutes = [
  ['/legal/requisites', 'Реквизиты'],
  ['/legal/privacy', 'Политика конфиденциальности'],
  ['/legal/terms', 'Условия продажи и возврата'],
  ['/legal/delivery', 'Доставка и оплата'],
] as const

const publicRoutes = [
  ['/', /BOOKFORYOU.*Эта книга для того, кто…/],
  ['/edition/001', 'BOOKFORYOU №001'],
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
  await page.getByRole('navigation', { name: 'Разделы сайта' }).getByRole('link', { name: 'Выпуск №001' }).click()
  await expect(page).toHaveURL(/\/edition\/001$/)
  await expect(page.getByRole('button', { name: 'Скоро будет доступно', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Скоро будет доступно', exact: true })).toHaveAttribute('aria-disabled', 'true')

  await page.getByRole('navigation', { name: 'Разделы сайта' }).getByRole('link', { name: 'Коллекция' }).click()
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
  await page.getByRole('navigation', { name: 'Основная навигация' }).getByRole('link', { name: 'Выпуск №001' }).click()
  await expect(page).toHaveURL(/\/edition\/001$/)
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})
