<div align="center">
  <img src="assets/favicon.svg" alt="TechStore Logo" width="80" height="80">
  
  # 📊 TechStore
  
  **Панель управления интернет-магазином электроники**
  
  [![GitHub Pages](https://img.shields.io/badge/Демо-GitHub%20Pages-0d6efd?style=for-the-badge&logo=github)](https://doctorstrangesh.github.io/TechStore/)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com)
  [![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?style=for-the-badge&logo=chart.js)](https://www.chartjs.org)
</div>

---


## 📋 О проекте

**TechStore** — адаптивная панель управления для интернет-магазина. Дашборд с KPI-метриками, таблицей заказов, графиком продаж и тёмной темой. Демонстрирует навыки работы с данными и сложными интерфейсами.

### 🎯 Что показывает проект
- Работу с таблицами, фильтрами и пагинацией
- Визуализацию данных (Chart.js)
- Управление состоянием интерфейса
- Доступность (ARIA-атрибуты)

---

## 🛠 Технический стек

<table>
  <tr>
    <td><strong>Вёрстка</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap">
      <img src="https://img.shields.io/badge/CSS_Variables-Тёмная_тема-1572B6?style=flat-square&logo=css3">
    </td>
  </tr>
  <tr>
    <td><strong>Графики</strong></td>
    <td>
      <img src="https://img.shields.io/badge/Chart.js-4.4-FF6384?style=flat-square&logo=chart.js">
    </td>
  </tr>
  <tr>
    <td><strong>Данные</strong></td>
    <td>
      <img src="https://img.shields.io/badge/JSON-Данные_отдельно-000000?style=flat-square&logo=json">
      <img src="https://img.shields.io/badge/LocalStorage-Сохранение_темы-FFCA28?style=flat-square">
    </td>
  </tr>
  <tr>
    <td><strong>Экспорт</strong></td>
    <td>
      <img src="https://img.shields.io/badge/CSV-Скачивание_таблицы-00C853?style=flat-square">
    </td>
  </tr>
</table>

---

## ✨ Ключевые фичи

| Фича | Описание | Технология |
|------|----------|------------|
| 🌙 **Тёмная тема** | Переключение светлой/тёмной темы с сохранением выбора | CSS Variables + LocalStorage |
| 📊 **KPI-карточки** | Анимированные счётчики: выручка, заказы, клиенты, возвраты | IntersectionObserver |
| 📋 **Таблица заказов** | Пагинация, фильтр по статусу, поиск по тексту | Vanilla JS |
| 📈 **График продаж** | Линейный график с переключением неделя/месяц | Chart.js |
| 🔍 **Детали заказа** | Модальное окно с полной информацией | Bootstrap Modal |
| 🏆 **Топ-товары** | Прогресс-бары с процентом продаж | Bootstrap Progress |
| 📥 **Экспорт CSV** | Скачивание отфильтрованных заказов | Blob API |
| 📱 **Адаптив** | Сайдбар сворачивается, таблица скроллится | Bootstrap Grid |

---

## 🔧 Быстрый старт

```bash
git clone https://doctorstrangesh.github.io/TechStore/
cd techstore
# Открой index.html через Live Server

