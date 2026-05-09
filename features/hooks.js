import { setDefaultTimeout, Before, After } from '@cucumber/cucumber'
import { chromium } from 'playwright'

setDefaultTimeout(60000)

Before(async function () {
  this.browser = await chromium.launch({
    headless: true
  })

  this.context = await this.browser.newContext({
    viewport: { width: 1366, height: 768 }
  })

  await this.context.clearCookies()

  this.page = await this.context.newPage()
})

After(async function () {
  await this.context?.close()
  await this.browser?.close()
})
