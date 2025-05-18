import { Locator, Page, expect } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' })
  }

  async waitForURL(url: string | RegExp) {
    await expect(this.page).toHaveURL(url)
  }

  //Проверка отображение всех элементов хедера
  async checkVisibleHeader() {
    await expect(this.page.getByRole('link', { name: 'main-page' })).toBeVisible()
    await expect(this.page.getByRole('banner').getByText('Недвижимость')).toBeVisible()
    await expect(this.page.getByRole('banner').getByText('Способы покупки')).toBeVisible()
    await expect(this.page.getByRole('banner').getByText('Акции')).toBeVisible()
    await expect(this.page.getByRole('banner').getByText('Клиентам')).toBeVisible()
    await expect(this.page.getByRole('banner').getByText('Сервисы')).toBeVisible()
    await expect(this.page.getByRole('banner').getByText('Ещё')).toBeVisible()
    await expect(this.page.getByRole('link', { name: '800 222 04 93' })).toBeVisible()
    await expect(this.page.getByText('Ежедневно с 9:00 до 21:')).toBeVisible()
    await expect(
      this.page.locator('div').filter({ hasText: /^Все города$/ })
    ).toBeVisible()
    await expect(this.page.getByRole('banner').getByRole('img').nth(2)).toBeVisible()
    await expect(
      this.page.getByRole('banner').locator('div').filter({ hasText: 'Войти' }).nth(4)
    ).toBeVisible()
  }

  //Проверка отображение всех элементов футера
  async checkVisibleFooter() {
    await expect(this.page.locator('.footer_footer__container__Vzu8y')).toBeVisible()
    await expect(this.page.getByText('на рассылку DOGMA')).toBeVisible()
    await expect(this.page.getByTestId('email-input-test')).toBeVisible()
    await expect(this.page.getByRole('link', { name: '800 222 04 93' })).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'https://vk.com/skdogma' })
    ).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'https://t.me/dogma_official' })
    ).toBeVisible()
    await expect(
      this.page.getByRole('link', { name: 'https://dzen.ru/1dogma' })
    ).toBeVisible()
  }

  protected async waitForElement(
    locator: Locator,
    options = { state: 'visible' as const }
  ) {
    await locator.waitFor(options)
    return locator
  }

  protected async clickAndWait(locator: Locator) {
    await locator.click()
    await this.page.waitForLoadState('domcontentloaded')
  }
}
