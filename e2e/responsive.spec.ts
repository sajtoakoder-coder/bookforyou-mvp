import { expect, test } from '@playwright/test'

const paths = ['/', '/edition/001', '/collection', '/legal/requisites', '/legal/privacy', '/legal/terms', '/legal/delivery']
const widths = [375, 768, 1024, 1440]

for (const width of widths) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const path of paths) {
      await page.goto(path)
      if (path === '/') {
        for (const image of await page.locator('main img').all()) {
          await image.evaluate((element) => element.scrollIntoView({ behavior: 'instant', block: 'center' }))
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0)
        }
        await page.screenshot({ path: `test-results/qa-home-${width}.png`, fullPage: true })
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
})

test('image failure shows the static fallback', async ({ page }) => {
  await page.route('**/hero-kit.png', (route) => route.abort())
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
  await expect(focused).toHaveCSS('color', 'rgb(244, 237, 226)')
  await expect(focused).toHaveCSS('outline-style', 'solid')
  const menu = page.getByRole('button', { name: 'Меню' })
  const box = await menu.boundingBox()
  expect(box?.width).toBeGreaterThanOrEqual(44)
  expect(box?.height).toBeGreaterThanOrEqual(44)
})
