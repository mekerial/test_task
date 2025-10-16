# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости (включая dev для сборки)
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Удаляем dev-зависимости
RUN npm prune --omit=dev

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start:prod"]
