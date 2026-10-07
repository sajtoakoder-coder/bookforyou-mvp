import { expect, test } from '@playwright/test'

for (const width of [375, 1575]) {
  test(`kit uses stable, uncropped object framing at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const preview = page.locator('#kit-preview')
    await preview.scrollIntoViewIfNeeded()
    const initialHeight = (await preview.boundingBox())!.height
    for (const number of ['01', '02', '03', '04']) {
      await page.getByRole('button', { name: new RegExp(`^${number} `) }).click()
      await expect(preview).toHaveAttribute('aria-busy', 'false')
      const layer = preview.locator('[data-active="true"]')
      await expect(layer).toHaveAttribute('data-part', String(Number(number) - 1))
      await expect(preview.getByRole('img')).toHaveCount(1)
      await layer.locator('img').evaluate((img: HTMLImageElement) => img.decode())
      const photo = await layer.boundingBox()
      expect(photo!.height).toBeCloseTo(photo!.width, 0)
      expect((await preview.boundingBox())!.height).toBeCloseTo(initialHeight, 0)
      expect(await layer.evaluate(element => parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThan(.001)
      await preview.screenshot({ path: `test-results/kit-framing-${number}-${width}.png`, animations: 'disabled' })
    }
  })
}

test('kit blends photographs through opacity rather than remounting a blank frame', async ({ page }) => {
  await page.setViewportSize({ width: 1575, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const preview = page.locator('#kit-preview')
  await preview.scrollIntoViewIfNeeded()
  for (const image of await preview.locator('img').all()) await image.evaluate((img: HTMLImageElement) => img.decode())
  await page.getByRole('button', { name: '02 ТЕКСТИЛЬНЫЙ КОНВЕРТ', exact: true }).click()
  const incoming = preview.locator('[data-active="true"]')
  await expect(incoming).toHaveAttribute('data-part', '1')
  await expect(incoming).toHaveCSS('transition-duration', '0.3s')
  const transition = await incoming.evaluate(element => {
    const animation = element.getAnimations().find(animation => animation instanceof CSSTransition && animation.transitionProperty === 'opacity')
    if (!animation) return null
    animation.pause()
    animation.currentTime = 150
    return { duration: animation.effect!.getTiming().duration, opacity: Number(getComputedStyle(element).opacity), transform: getComputedStyle(element).transform }
  })
  expect(transition).not.toBeNull()
  expect(transition!.duration).toBe(300)
  expect(transition!.opacity).toBeGreaterThan(0)
  expect(transition!.opacity).toBeLessThan(1)
  expect(transition!.transform).toBe('none')
  await expect(preview.locator('[data-part="0"]')).toHaveAttribute('aria-hidden', 'true')
  await expect(preview.locator('[data-part="0"] img')).toHaveCount(1)

  await page.evaluate(() => {
    for (const name of ['03 ЗАПЕЧАТАННЫЙ КОНВЕРТ', '01 КНИГА', '04 КАРТОЧКА С КООРДИНАТАМИ']) {
      document.querySelector<HTMLButtonElement>(`button[aria-label="${name}"]`)!.click()
    }
  })
  await expect(preview.locator('[data-active="true"]')).toHaveAttribute('data-part', '3')
  await expect(preview).toContainText('Свой маршрут по тексту.')
})

test('a slow photograph keeps the previous photo visible until it is ready', async ({ page }) => {
  let releasePhoto!: () => void
  const gate = new Promise<void>(resolve => { releasePhoto = resolve })
  await page.route('**/textile-envelope-client-v3-web.jpg', async route => {
    await gate
    await route.continue()
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const preview = page.locator('#kit-preview')
  await preview.scrollIntoViewIfNeeded()
  await preview.getByRole('img', { name: 'Книга BOOKFORYOU', exact: true }).evaluate((img: HTMLImageElement) => img.decode())
  try {
    await page.getByRole('button', { name: '02 ТЕКСТИЛЬНЫЙ КОНВЕРТ', exact: true }).click()
    await expect(preview).toHaveAttribute('aria-busy', 'true')
    await expect(preview.locator('[data-active="true"]')).toHaveAttribute('data-part', '0')
    await expect(preview.getByRole('img', { name: 'Книга BOOKFORYOU', exact: true })).toBeVisible()
  } finally { releasePhoto() }
  await expect(preview).toHaveAttribute('aria-busy', 'false')
  await expect(preview.locator('[data-active="true"]')).toHaveAttribute('data-part', '1')
})
