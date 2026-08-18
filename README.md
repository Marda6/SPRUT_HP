# SPRUTCAM Home page — прототип

Статический прототип домашних страниц СПРУТКАМ. Собран по Figma-файлу
[Home page](https://www.figma.com/design/co65JOTNHvAWuQDEtlZLdU/Home-page)
(`fileKey = co65JOTNHvAWuQDEtlZLdU`).

## Готово

| Страница | Файл | Figma node |
|---|---|---|
| Библиотека | [index.html](index.html) | `3064:14668` |

Разделы «Недавние», «Локальные», «Архив», «Менеджер лицензий» в навигации есть,
но страницы пока не собраны — кнопки не ведут никуда.

## Стек

Чистый HTML + CSS + JS, без сборки и зависимостей — открывается двойным кликом и
кладётся на GitHub Pages как есть.

```
index.html              страница «Библиотека»
assets/css/tokens.css   дизайн-токены (цвет, типографика, радиусы, сетка)
assets/css/styles.css   компоненты и раскладка
assets/js/data.js       данные прототипа + геометрия превью из макета
assets/js/app.js        рендер и взаимодействия
assets/img/             реальные SVG/PNG, выгруженные из Figma
```

Все цвета и размеры — только через переменные из `tokens.css`. База светлой темы —
прозрачности «инка» `#091E33`, акцент выделения `#3671D8`, primary-кнопка `#364759`.

## Локальный запуск

Достаточно открыть `index.html` в браузере. Или через локальный сервер:

```bash
python -m http.server 8000
```

## Публикация на GitHub Pages

1. Создать репозиторий на GitHub (например `sprutcam-home`).
2. Из этой папки:

```bash
git remote add origin https://github.com/<user>/sprutcam-home.git && git push -u origin main
```

3. В репозитории: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)`** → Save.
4. Через минуту страница будет на `https://<user>.github.io/sprutcam-home/`.

Всё готово к этому заранее: пути к ассетам относительные, есть `.nojekyll`
(чтобы Pages не прогонял файлы через Jekyll), точка входа — `index.html` в корне.

## Обновление из Figma

Ассеты в `assets/img/` — это экспорт из Figma; ссылки Figma живут 7 дней, поэтому
локальные копии закоммичены. При изменении макета выгружай иконки заново и
обновляй значения в `tokens.css`, а не хардкодь их в компонентах.
