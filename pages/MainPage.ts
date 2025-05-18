import { API_LEADS_PATH } from '@/constants/global'
import { IFormSubmitionResponse } from '@/interfaces/api'

import { Locator, Page, expect } from '@playwright/test'

import { BasePage } from './BasePage'

export class MainPage extends BasePage {
  readonly btnDetail: Locator
  readonly signUpForShowRoomBtn: Locator
  readonly showRoomFormImage: Locator
  readonly showRoomFormTitle: Locator
  readonly showRoomFormDescription: Locator
  readonly showRoomNameInput: Locator
  readonly showRoomPhoneInput: Locator
  readonly showRoomEmailInput: Locator
  readonly showRoomSubmitFormBtn: Locator
  readonly showRoomAgreement: Locator
  readonly showRoomInfoPhoneBtn: Locator
  readonly showRoomCloseBtn: Locator

  constructor(page: Page) {
    super(page)
    this.btnDetail = page.getByRole('button', { name: 'Подробнее' }).first()
    this.signUpForShowRoomBtn = this.page.getByText('Шоурум в «Самолёте»')
    this.showRoomFormImage = this.page.locator('.popup_image__1Jt_e')
    this.showRoomFormTitle = this.page.getByText('Записаться на экскурсию в шоурум')
    this.showRoomFormDescription = this.page.getByText(
      'Загляните в свою будущую квартиру: оцените удобство планировок и качество'
    )
    this.showRoomNameInput = this.page.getByTestId('input-test')
    this.showRoomPhoneInput = this.page.getByTestId('phone-input-test')
    this.showRoomEmailInput = this.page.getByRole('textbox', { name: 'Почта' })
    this.showRoomSubmitFormBtn = this.page.getByRole('button', { name: 'Отправить' })
    this.showRoomAgreement = this.page.getByText(
      'Нажимая на кнопку, вы подтверждаете свое согласие на'
    )
    this.showRoomInfoPhoneBtn = this.page.getByRole('button', { name: '861 213 80 24' })
    this.showRoomCloseBtn = this.page.locator('.popup_close__pEn5Z')
  }

  async clickFirstBanner() {
    await this.clickAndWait(this.btnDetail)
    await this.page.waitForURL(/\/stocks\/*/, { waitUntil: 'domcontentloaded' })
  }

  async checkShowRoomForm() {
    expect(this.showRoomFormImage).toBeVisible()
    expect(this.showRoomFormTitle).toBeVisible()
    expect(this.showRoomFormDescription).toBeVisible()
    expect(this.showRoomNameInput).toBeVisible()
    expect(this.showRoomPhoneInput).toBeVisible()
    expect(this.showRoomEmailInput).toBeVisible()
    expect(this.showRoomSubmitFormBtn).toBeVisible()
    expect(this.showRoomAgreement).toBeVisible()
    expect(this.showRoomInfoPhoneBtn).toBeVisible()
    expect(this.showRoomCloseBtn).toBeVisible()
  }

  async waitShowroomBanners() {
    await this.page.waitForSelector(
      ':nth-child(1) > div > div > .element_header__qzGbl',
      {
        state: 'visible',
        timeout: 10000,
      }
    )
  }

  async clickApartmentsFromHeaderMenu() {
    await this.page.getByRole('banner').getByText('Недвижимость').click()
    await this.page.getByRole('link', { name: 'Квартиры', exact: true }).click()
  }

  async fillApartmentShowRoomForm(name: string, phone: string, email: string) {
    await expect(this.signUpForShowRoomBtn).toBeVisible()
    await this.signUpForShowRoomBtn.click()
    await this.checkShowRoomForm()

    await this.showRoomNameInput.fill(name)
    await this.showRoomPhoneInput.fill(phone)
    await this.showRoomEmailInput.fill(email)
    await this.showRoomSubmitFormBtn.click()
    await this.page.waitForResponse(
      (response) =>
        response.url().includes(API_LEADS_PATH) && response.request().method() === 'POST'
      // response.status() === 200
    )

    const postDataPromise = new Promise((resolve) => {
      this.page.on('requestfinished', async (request) => {
        if (request.method() === 'POST' && request.url().includes(API_LEADS_PATH)) {
          resolve(request.postData())
        }
      })
    })

    // Проверяем, что в пэйлоаде ушли заполненные данные
    const resolvedPostData = await postDataPromise

    expect(resolvedPostData).toBeDefined()

    const parsedPayload: IFormSubmitionResponse = JSON.parse(resolvedPostData as string)

    expect(parsedPayload.name).toBe(name)
    expect(parsedPayload.phone).toBe(`7${phone}`)
    expect(parsedPayload.title).toMatch(/Шоурум баннер/)
  }
}
