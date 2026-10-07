import { expect, test } from '@playwright/test'

for (const width of [375, 768, 1024, 1575]) {
  test(`photos fill their intended frames without matte bars at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const giftImage = page.locator('#gift img')
    await giftImage.scrollIntoViewIfNeeded()
    await giftImage.evaluate((image: HTMLImageElement) => image.decode())
    await expect(giftImage).toHaveCSS('object-fit', 'cover')
    const gift = await giftImage.evaluate((image) => {
      const img = image.getBoundingClientRect()
      const frame = image.closest('figure')!.parentElement!.getBoundingClientRect()
      return { image: { width: img.width, height: img.height, top: img.top, left: img.left }, frame: { width: frame.width, height: frame.height, top: frame.top, left: frame.left } }
    })
    for (const dimension of ['width', 'height', 'top', 'left'] as const) {
      expect(gift.image[dimension]).toBeCloseTo(gift.frame[dimension], 0)
    }

    const preview = page.getByRole('region', { name: 'Деталь комплекта' })
    const initialHeight = (await preview.boundingBox())!.height
    for (const number of ['01', '02', '03', '04']) {
      await page.getByRole('button', { name: new RegExp(`^${number} `) }).click()
      const image = preview.locator('img')
      await image.scrollIntoViewIfNeeded()
      const frame = await image.evaluate(async (image: HTMLImageElement) => {
        await image.decode()
        const bounds = image.getBoundingClientRect()
        const figure = image.closest('figure')!.getBoundingClientRect()
        return {
          actualRatio: bounds.width / bounds.height,
          nativeRatio: image.naturalWidth / image.naturalHeight,
          imageHeight: bounds.height,
          figureHeight: figure.height,
          background: getComputedStyle(image.closest('figure')!).backgroundColor,
        }
      })
      expect(frame.actualRatio).toBeCloseTo(frame.nativeRatio, 2)
      expect(frame.imageHeight).toBeCloseTo(frame.figureHeight, 0)
      expect(frame.background).toBe('rgba(0, 0, 0, 0)')
      expect((await preview.boundingBox())!.height).toBeCloseTo(initialHeight, 0)
    }
  })
}

test('stacked hero softly fades into the background on mobile and tablet', async ({ page }) => {
  for (const width of [375, 768]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const hero = page.getByRole('img', { name: /Комплект BOOKFORYOU/ }).first()
    const mask = await hero.evaluate((image) => getComputedStyle(image.closest('figure')!.parentElement!).maskImage)
    expect(mask).toContain('linear-gradient')
    expect(mask).toContain('rgba(0, 0, 0, 0)')
    await expect(page.getByRole('heading', { level: 1, name: 'КНИГА ДЛЯ ТЕБЯ' })).toBeVisible()
  }
})
