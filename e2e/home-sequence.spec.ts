import { expect, test } from '@playwright/test'

const chapterIds = ['hero', 'idea', 'begin', 'questions', 'how-it-works', 'inside', 'keepsake', 'gift', 'curator', 'first-edition', 'home-collection']

for (const width of [320, 375, 768, 1024, 1575]) {
  test(`client chapters and isolated hero footer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.locator('main > section').evaluateAll(sections => sections.map(section => section.id))).toEqual(chapterIds)
    await expect(page.locator('#how-it-works li')).toHaveCount(4)
    const hero = page.locator('#hero')
    const footerLink = hero.getByRole('link', { name: 'Рассмотреть ближе' })
    await expect(footerLink).toHaveAttribute('href', '/#inside')
    const separation = await footerLink.evaluate(link => {
      const footer = link.parentElement!
      const image = document.querySelector<HTMLImageElement>('#hero img')!
      const photo = image.getBoundingClientRect()
      const strip = footer.getBoundingClientRect()
      const label = link.getBoundingClientRect()
      return { photoBottom: photo.bottom, stripTop: strip.top, labelTop: label.top, background: getComputedStyle(footer).backgroundColor }
    })
    expect(separation.photoBottom).toBeLessThanOrEqual(separation.stripTop + 1)
    expect(separation.labelTop).toBeGreaterThanOrEqual(separation.stripTop)
    expect(separation.background).toBe('rgb(22, 11, 8)')
    await footerLink.click()
    await expect(page).toHaveURL(/#inside$/)
    await expect(page.locator('#object-details-heading')).toBeFocused()
    await expect(page.locator('#inside')).toBeInViewport()
    const edition = page.locator('#first-edition')
    await expect(edition).toContainText('4 900 ₽')
    await expect(edition).toContainText('Теодор Драйзер')
    await expect(edition.getByRole('heading', { name: '«Гений»' })).toBeVisible()
    await expect(edition.getByRole('link', { name: 'Рассмотреть выпуск №001' })).toHaveAttribute('href', '/edition/001')
    const overflow = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }))
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport)
    const screenshotIds = width === 375 || width === 1575
      ? ['hero', 'begin', 'questions', 'how-it-works', 'inside', 'keepsake', 'first-edition']
      : ['hero', 'inside', 'first-edition']
    for (const id of screenshotIds) {
      const section = page.locator(`#${id}`)
      await section.scrollIntoViewIfNeeded()
      for (const image of await section.locator('img').all()) await image.evaluate((img: HTMLImageElement) => img.decode())
      await section.screenshot({ path: `test-results/sequence-${id}-${width}.png`, animations: 'disabled' })
    }
  })
}

test('reading flow works without collecting answers and edition remains navigable', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Что за вопрос?' }).click()
  await expect(page).toHaveURL(/#questions$/)
  await expect(page.locator('#questions-heading')).toBeFocused()
  await expect(page.locator('#questions')).toContainText('Не предсказание и не готовый ответ')
  await expect(page.locator('main input, main textarea, main form')).toHaveCount(0)
  await page.locator('#first-edition').getByRole('link', { name: 'Рассмотреть выпуск №001' }).click()
  await expect(page).toHaveURL(/\/edition\/001$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Гений' })).toBeVisible()
})

test('narrow portrait, landscape and enlarged text keep all chapters readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const viewport of [{ width: 320, height: 900 }, { width: 812, height: 375 }]) {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.addStyleTag({ content: 'html { font-size: 200%; }' })
    for (const heading of await page.locator('main h1, main h2, main h3').all()) {
      const bounds = await heading.boundingBox()
      expect(bounds!.x).toBeGreaterThanOrEqual(0)
      expect(bounds!.x + bounds!.width, await heading.textContent()).toBeLessThanOrEqual(viewport.width + 1)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width)
  }
})
