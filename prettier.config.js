/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    semi: false,
    singleQuote: true,
    printWidth: 90,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    bracketSameLine: true,
    trailingComma: 'es5',
    quoteProps: 'consistent',
    importOrder: [
      // Playwright и тестовые фреймворки
      "^@playwright/test$",
      "^playwright",
      "^@fixtures/(.*)$",
      
      // Конфигурация и утилиты проекта
      "^@config/(.*)$",
      "^@utils/(.*)$",
      
      // Тестовые страницы и компоненты
      "^@pages/(.*)$",
      "^@components/(.*)$",
      
      // Вспомогательные модули тестов
      "^tests/fixtures/(.*)$",
      "^tests/utils/(.*)$",
      "^tests/load/(.*)$",
      
      // Относительные импорты
      "^[.]/(.*)$",
      "^[.][.]/(.*)$"
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    plugins: ["@trivago/prettier-plugin-sort-imports"],
  }
  
  export default config
  