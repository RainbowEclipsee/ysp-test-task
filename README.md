# Тестовое задание. Компания YSP.
1. Для запуска проекта - git clone либо скачиваем zip.
2. npm install 
3. npm start

Отладочное API:
https://rcslabs.ru/ttrp1.json
https://rcslabs.ru/ttrp2.json
https://rcslabs.ru/ttrp3.json
https://rcslabs.ru/ttrp4.json
https://rcslabs.ru/ttrp5.json

# Пример JSON, если отвалится:
{
// Заголовок
// Данные по инстансу “dev”
// - Кол-во тестов по “Клиентской части” на “dev” // - по “Серверной части” на “dev”
// - по “Базе данных” на “dev”
// Данные по инстансу “test”
// - по “Клиентской части” на “test” // - по “Серверной части” на “test” // - по “Базе данных” на “test”
// Данные по инстансу “prod”
// - по “Клиентской части” на “prod” // - по “Серверной части” на “prod”
"title": "OS Doors",
"dev": {
  "front": 66,
  "back": 100,
  "db": 31
  },
"test": {
  "front": 60,
  "back": 80,
  "db": 31
  },
"prod": {
  "front": 66,
  "back": 83,
  "db": 31 // - по “Базе данных” на “prod” 
  },
"norm": 150 // Норматив 
}
