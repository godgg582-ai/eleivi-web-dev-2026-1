# Лабораторные работы по курсу «Веб-технологии»

**Студент:** Елейви Мухаммад Иядович  
**Учебное заведение:** Московский Политехнический Университет  
**Год:** 2026  
**Репозиторий:** [godgg582-ai / eleivi-web-dev-2026-1](https://github.com/godgg582-ai/eleivi-web-dev-2026-1)  
**Онлайн-демонстрация (GitHub Pages / Netlify / netrun.io):** [Главная страница со всеми лабораторными](https://godgg582-ai.github.io/eleivi-web-dev-2026-1/)

---

## 📋 Содержание репозитория

| Папка | Описание лабораторной работы | Страницы |
|---|---|---|
| **[lab1](./lab1/)** | Верстка главной страницы компании по доставке бизнес-ланчей (HTML5 + CSS) | [`index.html`](./lab1/index.html) |
| **[lab2](./lab2/)** | Страница меню «Собрать ланч», CSS Grid (3/2/1 колонки), Flexbox, адаптивность | [`lunch.html`](./lab2/lunch.html), [`index.html`](./lab2/index.html) |
| **[lab3](./lab3/)** | Форма заказа бизнес-ланча с отправкой данных POST на httpbin.org | [`lunch.html`](./lab3/lunch.html) |
| **[lab4](./lab4/)** | Динамический рендеринг карточек блюд из JS, сортировка по алфавиту, выбор блюд | [`lunch.html`](./lab4/lunch.html) |
| **[lab5](./lab5/)** | Расширение меню до 5 категорий (30 блюд) и фильтрация по видам (`data-kind`) | [`lunch.html`](./lab5/lunch.html) |
| **[lab6](./lab6/)** | Варианты доступных комбо, CSS-трансформации и валидация заказа с модальным окном | [`lunch.html`](./lab6/lunch.html) |
| **[lab7](./lab7/)** | Асинхронная загрузка блюд с REST API Политеха через `fetch()` с fallback-защитой | [`lunch.html`](./lab7/lunch.html) |
| **[lab8](./lab8/)** | Сохранение выбора в `localStorage`, плавающая панель и страница «Оформить заказ» | [`lunch.html`](./lab8/lunch.html), [`order.html`](./lab8/order.html) |
| **[lab9](./lab9/)** | История заказов, просмотр деталей, модальное редактирование (PUT) и удаление (DELETE) | [`orders.html`](./lab9/orders.html), [`order.html`](./lab9/order.html) |
| **[lab10](./lab10/)** | Адаптивный лендинг компании с Hero, сеткой Bootstrap 5 и формой обратной связи | [`index.html`](./lab10/index.html) |

---

## 🛠️ Проверка качества кода (Линтеры)

Проект полностью настроен и валидирован по официальным конфигурациям курса:
- **HTML:** [HTMLHint](https://htmlhint.com/) (файл `.htmlhintrc`)
- **JavaScript:** [ESLint](https://eslint.org/) (файл `eslint.config.mjs`)

Для запуска проверки локально:
```bash
npm install
npm run lint:html   # Проверка всех HTML-файлов
npm run lint:js     # Проверка всех JS-файлов
npm run lint        # Полная проверка проекта
```
