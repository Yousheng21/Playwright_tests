
# Комплексный набор тестов для веб-приложения, включающий E2E тесты и нагрузочные тесты.

## Структура проекта

```
playwright_tests/
├── .devcontainer/    # Конфигурация VS Code DevContainer
├── tests/
│   ├── e2e/           # End-to-end тесты
│   ├── load/          # Нагрузочные тесты
│   │   └── k6-tests/  # k6 тесты производительности
│   ├── fixtures/      # Общие фикстуры
├── pages/             # Page Objects
├── config/            # Конфигурации для разных окружений
├── reports/           # Отчеты о тестировании
└── playwright.config.ts
```

## Установка

```bash
# Установка зависимостей
yarn install

# Установка браузеров
yarn dlx playwright install
```

## Запуск тестов

### Локально

```bash
# Запуск всех тестов
yarn test

# Запуск только E2E тестов
yarn test:e2e

# Запуск нагрузочных тестов
yarn test:load

# Параллельный запуск тестов
yarn test:parallel

# Запуск тестов в UI режиме
yarn test:ui

# Запуск тестов в режиме отладки
yarn test:debug
```