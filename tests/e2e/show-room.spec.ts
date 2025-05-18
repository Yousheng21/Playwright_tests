import { users } from '@/constants/mockUserAccounts'
import { MainPage } from '@/pages/MainPage'
import { test } from '@playwright/test'

test('Записаться на показ квартиры (шоурум)', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.goto('/')
  await mainPage.waitShowroomBanners()
  await mainPage.fillApartmentShowRoomForm(users[0].name, users[0].phone, users[0].email)
})
