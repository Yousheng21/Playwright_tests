import test from '@playwright/test'

import { MainPage } from '@/pages/MainPage'
import { StockPage } from '@/pages/StockPage'

test('Переход к акции и заполнение формы', async ({ page }) => {
  const mainPage = new MainPage(page)
  const stockPage = new StockPage(page)

  // Открываем главную страницу
  await mainPage.goto('/')

  // Переходим на страницу акции по клику на баннер
  await mainPage.clickFirstBanner()

  // Заполняем и отправляем данные формы
  await stockPage.fillAprovalForm('Test Test Test', '+79991234567')
})
