import { expect, test } from '@playwright/test'

for (const width of [1440, 1920, 2560]) {
  test(`wide photographs and chapter boundaries at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1080 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)

    const heroImage = await page.locator('#hero img').boundingBox()
    expect(heroImage!.height).toBeGreaterThanOrEqual(width * 1536 / 2752 - 2)
    const footer = await page.locator('#hero > div').last().boundingBox()
    expect(heroImage!.y + heroImage!.height).toBeLessThanOrEqual(footer!.y + 1)

    const invitation = page.locator('#begin')
    const envelope = await invitation.locator('img').boundingBox()
    const chapter = await invitation.boundingBox()
    expect(chapter!.height).toBeGreaterThanOrEqual(700)
    expect(envelope!.width).toBeGreaterThan(width * .6)
    expect(envelope!.height).toBeGreaterThanOrEqual(chapter!.height - 1)
    expect(await invitation.locator('img').evaluate(img => getComputedStyle(img.parentElement!.parentElement!).maskImage)).toContain('linear-gradient')

    const kit = page.locator('#inside')
    const overview = await kit.locator('img').first().boundingBox()
    expect(overview!.height).toBeGreaterThanOrEqual(width * 1536 / 2752 - 2)
    const divider = await kit.locator('> div').nth(1).evaluate(element => {
      const style = getComputedStyle(element)
      return { width: style.borderTopWidth, style: style.borderTopStyle, color: style.borderTopColor }
    })
    expect(divider).toEqual({ width: '1px', style: 'solid', color: 'rgba(184, 148, 91, 0.32)' })
    expect(await kit.evaluate(element => getComputedStyle(element).borderBottomWidth)).toBe('1px')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)

    if (width === 1920) {
      for (const id of ['hero', 'begin']) {
        const section = page.locator(`#${id}`)
        await section.scrollIntoViewIfNeeded()
        await section.locator('img').evaluate((img: HTMLImageElement) => img.decode())
        await section.screenshot({ path: `test-results/rhythm-${id}-${width}.png`, animations: 'disabled' })
      }
      await kit.locator('> div').first().scrollIntoViewIfNeeded()
      await kit.locator('img').first().evaluate((img: HTMLImageElement) => img.decode())
      await kit.locator('> div').first().screenshot({ path: `test-results/rhythm-inside-${width}.png`, animations: 'disabled' })
      await kit.locator('> div').nth(1).evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
      await page.screenshot({ path: `test-results/rhythm-boundary-${width}.png`, animations: 'disabled' })
    }
  })
}

test('wide photo height is not lost at smaller text scale', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/')
  await page.addStyleTag({ content: 'html { font-size: 80%; }' })
  for (const selector of ['#hero img', '#inside img']) {
    const image = await page.locator(selector).first().boundingBox()
    expect(image!.height).toBeGreaterThanOrEqual(1920 * 1536 / 2752 - 2)
  }
})
