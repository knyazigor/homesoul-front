# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходники
COPY . .

# Указываем переменные окружения для сборки
ENV NODE_ENV=production
ENV BASE_URL=https://api.dushavashegodoma.ru/api
ENV NEXT_PUBLIC_API_URL=https://api.dushavashegodoma.ru

# Собираем приложение
RUN npm run build

# Этап запуска
FROM node:20-alpine

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем все необходимое для запуска
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV BASE_URL=https://api.dushavashegodoma.ru/api
ENV NEXT_PUBLIC_API_URL=https://api.dushavashegodoma.ru

CMD ["npm", "start"]