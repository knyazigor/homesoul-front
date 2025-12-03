# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Кэшируем зависимости для ускорения сборки
COPY package*.json ./
RUN npm ci

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Этап запуска
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем собранное приложение
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Открываем порт
EXPOSE 3000

# Запускаем
CMD ["npm", "start"]