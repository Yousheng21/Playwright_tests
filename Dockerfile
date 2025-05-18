# Используем Node.js как базовый образ
FROM mcr.microsoft.com/playwright:v1.41.0-jammy

# Устанавливаем k6
RUN apt-get update && \
    apt-get install -y gpg && \
    gpg -k && \
    gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69 && \
    echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && \
    apt-get install -y k6

# Устанавливаем pnpm
RUN npm install -g pnpm@10.5.2

# Создаем директорию приложения
WORKDIR /app

# Копируем файлы package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем браузеры Playwright
RUN pnpm dlx playwright install --with-deps chromium firefox webkit

# Команда по умолчанию
CMD ["pnpm", "test"] 