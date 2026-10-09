# lakomka-schema

Рабочая схема заказа для https://schema.lakom-st.ru

В репозитории только сайт. На сервер выкладывается **только** каталог `schema.lakom-st.ru/`.

## Локально

```bash
cd schema.lakom-st.ru
php -S 127.0.0.1:8765
```

Открыть http://127.0.0.1:8765/

Данные доски пишутся в `schema.lakom-st.ru/data/` (локально) или в `/var/www/schema-data` на сервере.

## Деплой

Пуш в `main` → на сервере скрипт забирает репозиторий и копирует только `schema.lakom-st.ru/` в webroot.
Runtime JSON (правки, комментарии, версии) в git не входят.
