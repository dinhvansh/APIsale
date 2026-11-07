// Run: node src/features/auth/__tests__/presentation.browser.mjs <playwright module path> <output directory>
// Verifies the real local application without creating accounts or submitting credentials.
import assert from 'node:assert/strict'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const { chromium } = await import(
  process.argv[2]
    ? pathToFileURL(path.join(process.argv[2], 'index.mjs')).href
    : 'playwright'
)

;(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' })
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    })
    await context.addInitScript(() => localStorage.setItem('i18nextLng', 'vi'))
    const page = await context.newPage()
    for (const route of ['sign-in', 'sign-up']) {
      await page.goto(`http://localhost:5173/${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      })
      await page.locator('main form').waitFor()
      assert.equal(await page.locator('main h1').count(), 1)
      const username = page.locator('input[autocomplete="username"]')
      assert.equal(await username.count(), 1)
      const password = page
        .locator(
          `input[autocomplete="${
            route === 'sign-in' ? 'current-password' : 'new-password'
          }"]`
        )
        .first()
      await password.fill('Example passphrase for UI check')
      await password.focus()
      await page.keyboard.press('Tab')
      const reveal = page
        .getByRole('button', { name: 'Toggle password visibility' })
        .first()
      assert.equal(
        await reveal.evaluate((el) => el === document.activeElement),
        true
      )
      await page.keyboard.press('Enter')
      assert.equal(await password.getAttribute('type'), 'text')
      assert.equal(
        await password.inputValue(),
        'Example passphrase for UI check'
      )
      await page.keyboard.press('Enter')
      assert.equal(await password.getAttribute('type'), 'password')
      await password.fill('')
      await page.locator('main button[type="submit"]').click()
      await page.locator('[aria-invalid="true"]').first().waitFor()
      assert.equal(await username.getAttribute('aria-invalid'), 'true')
      // Clean state for screenshots and navigation assertions.
      await page.reload({ waitUntil: 'domcontentloaded' })
      await page.locator('main form').waitFor()
      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({
          width,
          height: width === 1440 ? 1000 : 740,
        })
        const layout = await page.evaluate(() => {
          const story = document.querySelector('.bee-auth-story')
          const button = document.querySelector('main button[type="submit"]')
          return {
            overflow: document.documentElement.scrollWidth > innerWidth,
            storyVisible: getComputedStyle(story).display !== 'none',
            buttonHeight: button.getBoundingClientRect().height,
          }
        })
        assert.equal(layout.overflow, false, `${route} overflows at ${width}px`)
        assert.equal(layout.storyVisible, width >= 1024)
        assert.ok(layout.buttonHeight >= 44)
        const submit = page.locator('main button[type="submit"]')
        await submit.scrollIntoViewIfNeeded()
        assert.ok(await submit.isVisible())
        if (process.argv[3] && width !== 320) {
          await page.screenshot({
            path: path.join(
              process.argv[3],
              `beeskybase-${route}-${width}.png`
            ),
            fullPage: true,
          })
        }
      }
      await page.setViewportSize({ width: 1440, height: 1000 })
      await page.evaluate(() => document.documentElement.classList.add('dark'))
      await page.waitForFunction(() => getComputedStyle(document.querySelector('main input')).backgroundColor === 'rgb(36, 40, 31)')
      if (process.argv[3]) {
        await page.screenshot({
          path: path.join(process.argv[3], `beeskybase-${route}-dark.png`),
          fullPage: true,
        })
      }
      await page.evaluate(() =>
        document.documentElement.classList.remove('dark')
      )
      const alternate = page.locator(
        `main a[href="/${route === 'sign-in' ? 'sign-up' : 'sign-in'}"]`
      )
      await alternate.click()
      await page.waitForURL(`**/${route === 'sign-in' ? 'sign-up' : 'sign-in'}`)
    }
    console.log(
      'PASS: login/register desktop, mobile, overflow, keyboard password reveal, autofill, validation, and navigation'
    )
  } finally {
    await browser.close()
  }
})().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
