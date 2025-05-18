import { BasePage } from '@/pages/BasePage'

import { test } from '@playwright/test'

test('Load main page', async ({ page }) => {
  const basePage = new BasePage(page)
  await basePage.goto('/')
})
