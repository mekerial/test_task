<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

API для бронирования места на мероприятие. Один пользователь не может забронировать дважды на одно событие.

## Возможности

- Бронирование места на мероприятие через POST /api/bookings/reserve
- Проверка на дублирование бронирования
- Проверка доступности мест
- Использование PostgreSQL и TypeORM
- Docker контейнеризация

## Структура базы данных

### Таблица events:
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- total_seats (INT)

### Таблица bookings:
- id (SERIAL PRIMARY KEY)
- event_id (INT, ссылка на events)
- user_id (VARCHAR)
- created_at (TIMESTAMP)

## Настройка окружения

1. Скопируйте файл `env.example` в `.env`:
```bash
cp env.example .env
```

2. Отредактируйте `.env` файл с вашими настройками:
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password
DB_NAME=booking_db

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Запуск с Docker

```bash
# Запуск всех сервисов
$ docker-compose up -d

# Просмотр логов
$ docker-compose logs -f

# Остановка сервисов
$ docker-compose down
```

После запуска приложения можно инициализировать тестовые данные:

```bash
# Инициализация тестовых событий
$ npm run init:data
```

## Локальная разработка

```bash
# Установка зависимостей
$ npm install

# Запуск PostgreSQL (требуется установленный PostgreSQL)
# Создайте базу данных booking_db

# Запуск в режиме разработки
$ npm run start:dev
```

## API Endpoints

### POST /api/bookings/reserve

Бронирование места на мероприятие.

**Тело запроса:**
```json
{
  "event_id": 1,
  "user_id": "user123"
}
```

**Ответы:**
- 201 Created - Бронирование успешно создано
- 409 Conflict - Пользователь уже забронировал место на это событие или нет свободных мест
- 404 Not Found - Событие не найдено
- 400 Bad Request - Некорректные данные запроса

**Пример успешного ответа:**
```json
{
  "id": 1,
  "event_id": 1,
  "user_id": "user123",
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

**Пример ошибки дублирования:**
```json
{
  "statusCode": 409,
  "message": "User has already booked a seat for this event",
  "error": "Conflict"
}
```

## Примеры использования

### Тестирование с curl

```bash
# Бронирование места
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id": 1, "user_id": "user123"}'

# Попытка повторного бронирования (должна вернуть ошибку)
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id": 1, "user_id": "user123"}'
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
