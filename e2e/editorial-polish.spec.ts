import { expect, test } from '@playwright/test'

for (const width of [375, 768, 1024, 1575]) {
  test(`kit photographs fill integrated spreads without inset feathering at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const overview = page.locator('#inside > div').first().locator('figure')
    const detail = page.locator('#kit-preview figure')
    for (const figure of [overview, detail]) {
      await expect(figure).toHaveCSS('mask-image', 'none')
      await expect(figure.locator('img')).toHaveCSS('filter', 'none')
      await expect(figure.locator('img')).toHaveCSS('object-fit', 'cover')
    }
    expect((await overview.boundingBox())!.width).toBeCloseTo(width, 0)
    for (const number of ['01', '02', '03', '04']) {
      await page.getByRole('button', { name: new RegExp(`^${number} `) }).click()
      await expect(detail).toHaveCSS('mask-image', 'none')
      await expect(detail.locator('img')).toHaveCSS('filter', 'none')
    }
  })
}

test('adjacent keepsake and gift spreads share a central seam and deeper wine surfaces', async ({ page }) => {
  await page.setViewportSize({ width: 1575, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const keepsakeImage = page.locator('#keepsake img')
  const giftImage = page.locator('#gift img')
  const keepsake = (await keepsakeImage.boundingBox())!
  const gift = (await giftImage.boundingBox())!
  expect(keepsake.width).toBeCloseTo(gift.width, 0)
  expect(keepsake.x).toBeCloseTo(gift.x + gift.width, 0)
  for (const id of ['gift', 'home-collection']) {
    const field = page.locator(`#${id}`)
    const palette = await field.evaluate(element => getComputedStyle(element).backgroundImage)
    expect(palette).toContain('rgb(69, 21, 17)')
    expect(palette).toContain('rgb(43, 10, 9)')
    expect(palette).not.toContain('rgb(96, 40, 27)')
  }
  for (const id of ['inside', 'keepsake', 'gift', 'home-collection', 'first-edition']) {
    const section = page.locator(`#${id}`)
    await section.scrollIntoViewIfNeeded()
    for (const image of await section.locator('img').all()) await image.evaluate((img: HTMLImageElement) => img.decode())
    await section.screenshot({ path: `test-results/polish-${id}-1575.png`, animations: 'disabled' })
  }
  await page.locator('#keepsake').evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'center' }))
  await page.screenshot({ path: 'test-results/polish-shared-seam-1575.png', animations: 'disabled' })
})
