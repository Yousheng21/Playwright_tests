import { Locator, Page } from '@playwright/test'

import { BasePage } from './BasePage'

export class StockPage extends BasePage {
  readonly nameInput: Locator
  readonly phoneInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page)
    this.nameInput = page.getByTestId('input-test').first()
    this.phoneInput = page.getByTestId('phone-input-test').first()
    this.submitButton = page.getByRole('button', { name: 'Отправить' })
  }

  async fillAprovalForm(name: string, phone: string) {
    await this.nameInput.fill(name)
    await this.phoneInput.fill(phone)
    await this.submitButton.click()
    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/api/forms/v1/leads') && response.status() === 200
    )
  }
}
