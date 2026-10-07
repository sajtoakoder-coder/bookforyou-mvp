import { expect, test } from '@playwright/test'

for (const width of [320, 375, 390, 430, 768]) {
  test(`mobile chapters have separate photographs and clear boundaries at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const questions = page.locator('#questions')
    const heading = await questions.locator('h2').boundingBox()
    const card = await questions.locator('img').boundingBox()
    expect(heading!.y + heading!.height).toBeLessThan(card!.y)
    await expect(page.locator('#gift img')).toBeHidden()
    await expect(page.locator('#keepsake img')).toBeVisible()
    for (const section of ['#hero', '#begin', '#keepsake', '#first-edition']) {
      const boundary = section === '#hero' ? page.locator('#hero a[href="/#inside"]').locator('..') : page.locator(section)
      const rule = await boundary.evaluate((el, section) => {
        const style = getComputedStyle(el)
        return section === '#hero' ? style.borderTopWidth : style.borderBottomWidth
      }, section)
      expect(parseFloat(rule)).toBeGreaterThanOrEqual(1)
    }
    const overview = questions.locator('img')
    await expect(overview).toHaveCSS('object-fit', 'cover')
    const opening = page.locator('#inside > div').first()
    expect((await opening.locator('img').boundingBox())!.y).toBeLessThan((await opening.locator('h2').boundingBox())!.y)
    for (const link of await page.locator('main a').all()) {
      const text = await link.textContent()
      expect(text).not.toMatch(/[↗↓]/)
    }
    await expect(page.locator('#hero a[href="/edition/001"] svg')).toHaveAttribute('aria-hidden', 'true')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}

test('a transient book download failure retries the photograph rather than replacing it with artwork', async ({ page }) => {
  let attempts = 0
  await page.route(/book-client-v3-web\.jpg(?:\?photo_retry=\d+)?$/, route => ++attempts === 1 ? route.abort() : route.continue())
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/edition/001')
  const image = page.locator('article img').first()
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(1792)
  expect(attempts).toBeGreaterThanOrEqual(2)
  await expect(image).not.toHaveAttribute('src', /svg/)
})

test('a permanently missing book has a bounded, recoverable error state', async ({ page }) => {
  const bookUrl = /book-client-v3-web\.jpg(?:\?photo_retry=\d+)?$/
  await page.route(bookUrl, route => route.abort())
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/edition/001')
  const cover = page.locator('article figure').first()
  await expect(cover.getByRole('button', { name: 'Загрузить фото ещё раз' })).toBeVisible()
  await expect(cover.locator('img')).toHaveCount(0)
  const before = (await cover.boundingBox())!.height
  expect(before).toBeLessThanOrEqual(500)
  await page.unroute(bookUrl)
  await cover.getByRole('button', { name: 'Загрузить фото ещё раз' }).click()
  await expect.poll(() => cover.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(1792)
  expect((await cover.boundingBox())!.height).toBeCloseTo(before, 0)
})

test('kit photo failures settle selection and can be retried without changing its frame', async ({ page }) => {
  const photoUrl = /textile-envelope-client-v3-web\.jpg(?:\?photo_retry=\d+)?$/
  await page.route(photoUrl, route => route.abort())
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const preview = page.locator('#kit-preview')
  await preview.scrollIntoViewIfNeeded()
  const before = (await preview.boundingBox())!.height
  await page.getByRole('button', { name: '02 ТЕКСТИЛЬНЫЙ КОНВЕРТ', exact: true }).click()
  await expect(preview).toHaveAttribute('aria-busy', 'false')
  await expect(preview.getByRole('button', { name: 'Загрузить фото ещё раз' })).toBeVisible()
  expect((await preview.boundingBox())!.height).toBeCloseTo(before, 0)
  await page.unroute(photoUrl)
  await preview.getByRole('button', { name: 'Загрузить фото ещё раз' }).click()
  await expect.poll(() => preview.getByRole('img').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(2752)
  expect((await preview.boundingBox())!.height).toBeCloseTo(before, 0)
})
