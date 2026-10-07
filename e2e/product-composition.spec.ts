import { expect, test } from '@playwright/test'

for (const width of [375, 768, 1440]) {
  test(`product spreads have large photographs and readable metadata at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/collection')
    await page.evaluate(() => document.fonts.ready)
    const release = page.getByRole('article', { name: 'BOOKFORYOU №001' })
    await expect(release.locator('div > span[aria-hidden]')).toHaveCount(0)
    for (const number of ['002', '003']) {
      const row = page.getByRole('article', { name: `BOOKFORYOU №${number}` })
      await expect(row.getByText('Будущий выпуск')).toHaveCSS('color', 'rgb(128, 84, 43)')
      await expect(row.getByText('Цена будет объявлена')).toHaveCSS('color', 'rgb(33, 22, 16)')
    }
    await page.locator('main img').evaluate((img: HTMLImageElement) => img.decode())
    await page.locator('main').screenshot({ path: `test-results/composition-collection-${width}.png` })

    await page.goto('/edition/001')
    const edition = page.getByRole('article', { name: 'Гений' })
    await expect(edition).toContainText('Для того, кто не хочет прожить чужую жизнь.')
    await expect(edition).toContainText('4 900 ₽')
    await expect(edition).not.toContainText('Описание выпуска будет добавлено')
    await expect(edition.getByRole('link', { name: 'Вернуться к коллекции' })).toBeVisible()
    const photo = edition.locator('img')
    await photo.evaluate((img: HTMLImageElement) => img.decode())
    expect((await photo.boundingBox())!.width).toBeGreaterThan(width * .5)
    await edition.screenshot({ path: `test-results/composition-edition-${width}.png` })
    await edition.getByRole('link', { name: 'Рассмотреть комплект' }).click()
    await expect(page).toHaveURL(/\/edition\/001#inside$/)
    await expect(page.locator('#object-details-heading')).toBeFocused()

    await page.goto('/')
    const kit = page.locator('#inside')
    const opening = kit.locator(':scope > div').first()
    await opening.scrollIntoViewIfNeeded()
    await opening.locator('img').evaluate((img: HTMLImageElement) => img.decode())
    await opening.screenshot({ path: `test-results/composition-kit-opening-${width}.png` })
    const preview = page.locator('#kit-preview')
    await preview.scrollIntoViewIfNeeded()
    await preview.locator('img').evaluate((img: HTMLImageElement) => img.decode())
    const frame = (await preview.locator('figure').boundingBox())!
    expect(frame.width).toBeGreaterThanOrEqual(width * .5)
    expect(frame.height).toBeGreaterThan(440)
    await preview.locator('..').screenshot({ path: `test-results/composition-kit-detail-${width}.png` })
    for (const number of ['02', '03', '04']) {
      await page.getByRole('button', { name: new RegExp(`^${number} `) }).click()
      await preview.locator('img').evaluate((img: HTMLImageElement) => img.decode())
      await preview.locator('figure').screenshot({ path: `test-results/composition-kit-part-${number}-${width}.png` })
    }
  })
}

test('collection and edition fit narrow and enlarged text layouts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const viewport of [{ width: 320, height: 900 }, { width: 812, height: 375 }]) {
    await page.setViewportSize(viewport)
    for (const route of ['/collection', '/edition/001']) {
      await page.goto(route)
      await page.addStyleTag({ content: 'html { font-size: 200%; }' })
      const bounds = await page.locator('main h1, main h2, main h3, main p, main a').evaluateAll(nodes => nodes.map(node => {
        const box = node.getBoundingClientRect()
        return { right: box.right, left: box.left, text: node.textContent }
      }))
      for (const box of bounds) {
        expect(box.left, box.text ?? '').toBeGreaterThanOrEqual(0)
        expect(box.right, box.text ?? '').toBeLessThanOrEqual(viewport.width + 1)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width)
    }
  }
})
