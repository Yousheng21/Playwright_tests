import { test as base } from '@playwright/test'

// import { TestDataGenerator } from '../utils/dataHelpers'

type AuthFixtures = {
  authenticatedPage: {
    token: string
    userId: string
  }
}

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Здесь можно добавить логику аутентификации
    // const userData = TestDataGenerator.generateUser()

    // Пример установки токена в localStorage
    await page.evaluate((token) => {
      localStorage.setItem('authToken', token)
    }, 'example-token')

    await use({
      token: 'example-token',
      userId: 'example-user-id',
    })

    // Очистка после теста
    await page.evaluate(() => {
      localStorage.clear()
    })
  },
})
