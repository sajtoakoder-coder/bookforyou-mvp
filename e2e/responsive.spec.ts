import { expect, test } from '@playwright/test'

const paths = ['/', '/edition/001', '/collection', '/legal/requisites', '/legal/privacy', '/legal/terms', '/legal/delivery']
const widths = [375, 768, 1024, 1440]

for (const width of [375, 1440]) {
  test(`campaign hero fits its opening viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole('banner', { name: 'Шапка сайта' })).toBeVisible()
    const title = page.getByRole('heading', { level: 1, name: 'КНИГА ДЛЯ ТЕБЯ' })
    await expect(title).toBeVisible()
    await expect(page.locator('main').getByText('№001 · 4 900 ₽')).toBeInViewport()
    await expect(page.getByRole('button', { name: /купить|заказать/i })).toHaveCount(0)
    const lines = await title.evaluate((heading) => {
      const range = document.createRange()
      range.selectNodeContents(heading)
      return Array.from(range.getClientRects()).filter((rect) => rect.width > 0).map((rect) => ({ textLeft: rect.left, textRight: rect.right }))
    })
    expect(lines.length).toBeGreaterThan(0)
    for (const line of lines) {
      expect(line.textLeft).toBeGreaterThanOrEqual(0)
      expect(line.textRight).toBeLessThanOrEqual(width)
    }
  })
}

for (const width of widths) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const path of paths) {
      await page.goto(path)
      if (path === '/') {
        await page.evaluate(() => document.fonts.ready)
        for (const image of await page.locator('main img').all()) {
          await image.evaluate((element) => element.scrollIntoView({ behavior: 'instant', block: 'center' }))
          await expect.poll(() => image.evaluate(async (element: HTMLImageElement) => {
            // decode() also settles for cached images and rejects for broken ones.
            // Retry allows the component's error handler to swap in its fallback.
            try {
              await element.decode()
              return element.complete && element.naturalWidth > 0
            } catch {
              return false
            }
          })).toBe(true)
        }
        for (const block of await page.locator('[data-reveal]').all()) {
          await block.scrollIntoViewIfNeeded()
          await expect(block).toHaveAttribute('data-reveal', 'visible')
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
        await page.screenshot({ path: `test-results/qa-home-${width}.png`, fullPage: true, animations: 'disabled' })
      }
      const metrics = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }))
      expect(metrics.document, `${path} document at ${width}px`).toBeLessThanOrEqual(metrics.viewport)
      expect(metrics.body, `${path} body at ${width}px`).toBeLessThanOrEqual(metrics.viewport)
    }
  })
}

test('reduced motion stops the ambient hero animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const hero = page.getByRole('img', { name: /Комплект BOOKFORYOU/ }).first()
  await expect(hero).toBeVisible()
  await expect(hero).toHaveCSS('animation-name', 'none')
  await expect(page.getByRole('heading', { level: 1, name: 'КНИГА ДЛЯ ТЕБЯ' })).toBeVisible()
  await expect(page.locator('main').getByText('№001 · 4 900 ₽')).toBeVisible()
  for (const block of await page.locator('[data-reveal]').all()) {
    await expect(block).toHaveCSS('opacity', '1')
    await expect(block).toHaveCSS('transform', 'none')
  }
})

test('kit detail selector switches the visual with keyboard and no server request', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const preview = page.getByRole('region', { name: 'Деталь комплекта' })
  const book = page.getByRole('button', { name: '01 КНИГА', exact: true })
  const coordinates = page.getByRole('button', { name: '04 КАРТОЧКА С КООРДИНАТАМИ', exact: true })
  await expect(book).toHaveAttribute('aria-pressed', 'true')
  const textile = page.getByRole('button', { name: '02 ТЕКСТИЛЬНЫЙ КОНВЕРТ', exact: true })
  await textile.click()
  await expect(textile).toHaveAttribute('aria-pressed', 'true')
  await expect(preview.getByRole('img', { name: 'Текстильный конверт для книги BOOKFORYOU', exact: true })).toBeVisible()
  await expect(page.locator('main')).not.toContainText(/коробк/i)
  await coordinates.scrollIntoViewIfNeeded()
  await coordinates.focus()
  await page.keyboard.press('Enter')
  await expect(coordinates).toHaveAttribute('aria-pressed', 'true')
  await expect(book).toHaveAttribute('aria-pressed', 'false')
  await expect(preview.getByRole('img', { name: 'Карточка с координатами BOOKFORYOU', exact: true })).toBeVisible()
  await expect(preview).toContainText('Свой маршрут по тексту.')
  await book.click()
  await expect(preview.getByRole('img', { name: 'Книга BOOKFORYOU', exact: true })).toBeVisible()
})

test('image failure shows the static fallback', async ({ page }) => {
  await page.route('**/hero-client-v3-web.jpg', (route) => route.abort())
  await page.goto('/')
  const hero = page.getByRole('img', { name: /Комплект BOOKFORYOU/ }).first()
  await expect(hero).toHaveAttribute('src', /^data:image\/svg\+xml/)
  await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
})

test('keyboard focus and mobile menu meet control sizing', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.keyboard.press('Tab')
  const focused = page.locator(':focus')
  await expect(focused).toHaveAttribute('aria-label', 'BOOKFORYOU — главная')
  await expect(focused).toHaveCSS('color', 'rgb(244, 231, 209)')
  await expect(focused).toHaveCSS('outline-style', 'solid')
  const menu = page.getByRole('button', { name: 'Меню' })
  const box = await menu.boundingBox()
  expect(box?.width).toBeGreaterThanOrEqual(44)
  expect(box?.height).toBeGreaterThanOrEqual(44)
})
