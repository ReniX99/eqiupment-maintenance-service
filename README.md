# REST API: сервис учёта заявок на обслуживание оборудования

REST API для учёта заявок на техническое обслуживание оборудования производственной площадки. Сервис ведёт справочник оборудования и заявки на его обслуживание, контролирует жизненный цикл заявки и позволяет оценить погодные условия на объекте перед планированием наружных работа

## Требования

Для запуска приложения необходимо установить:

- Git
- Node.js **20+**
- npm **10+**
- Docker
- Docker Compose

## Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/ReniX99/eqiupment-maintenance-service
```

### 2. Переход в директорию проекта

```bash
cd <project-name>
```

### 3. Настройка окружения

Создайте файл `.env` в корневой директории проекта. Используйте файл `.env.example` как шаблон

```env
PORT= ... # Порт программы
CORS_ORIGIN= ... # Разрешённый источник для взаимодействия с сервисом
NODE_ENV= ... # Среда выполнения (development/production)
RATE_LIMIT= ... # Ограничение по количеству запросов в минуту
REQUEST_SIZE_LIMIT= ... # Ограничение на размер тела запроса
WEATHER_API_URL= ... # API для получения прогноза погоды
REQUEST_TIMEOUT_MS= ... # Время ожидания запроса от внешнего API (миллисекунды)
POSTGRES_USER= ... # Имя пользователя PostgreSQL
POSTGRES_PASSWORD= ... # Пароль пользователя PostgreSQL
POSTGRES_DB= ... # Имя базы данных PostgreSQL
DATABASE_URL= ... # Строка подключения к базе данных PostgreSQL
```

### 4. Запуск PostgreSQL

```bash
docker compose up -d
```

### 5. Установка зависимостей

```bash
npm install
```

### 6. Применение миграций

```bash
npx sequelize-cli db:migrate
```

### 7. Заполнение базы данных сидами

```bash
npx sequelize-cli db:seed:all
```

### 8 Настройка конфигурации для пригодности работ

Конфигурации расположена в `config/weather.json`

```json
{
  "minTemperature": -15,
  "maxTemperature": 35,
  "precipitationSum": 3,
  "windSpeed": 10
}
```

### 9. Запуск приложения

```bash
npm run dev
```

## Таблица эндпоинтов

<img width="841" height="618" alt="image" src="https://github.com/user-attachments/assets/94e789ba-2c27-4bf2-a457-b3fc6b2b15e7" />
<img width="1172" height="329" alt="image" src="https://github.com/user-attachments/assets/76a28e88-bd8b-493e-b766-454e221371d1" />


## Формат ошибки

```json
{
  "message": "Request body is too large",
  "statusCode": 413,
  "details": null,
  "requestId": "4daf593d-0d88-4602-a554-1fb14e3ec79d"
}
```
