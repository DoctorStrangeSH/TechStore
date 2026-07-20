// ============================================
// TechStore Dashboard v2.0 — Данные
// ============================================

const dashboardData = {
  
  // Заказы
  orders: [
    { 
      id: '#1089', customer: 'Анна Михайлова', email: 'anna@example.com', 
      date: '23.06.2026', amount: '47 990 ₽', status: 'delivered', 
      items: [
        { name: 'iPhone 15 Pro', qty: 1, price: '47 990 ₽' },
        { name: 'Защитное стекло', qty: 1, price: 'Бесплатно' }
      ],
      phone: '+7 (999) 123-45-67',
      address: 'Москва, ул. Тверская, 12, кв. 45', 
      payment: 'Карта Visa **** 4567' 
    },
    { 
      id: '#1088', customer: 'Дмитрий Ковалёв', email: 'dmitry@example.com', 
      date: '23.06.2026', amount: '12 490 ₽', status: 'processing', 
      items: [
        { name: 'Наушники AirPods Pro', qty: 1, price: '12 490 ₽' }
      ],
      phone: '+7 (999) 234-56-78',
      address: 'СПб, Невский пр., 88, кв. 12', 
      payment: 'Apple Pay' 
    },
    { 
      id: '#1087', customer: 'Елена Соколова', email: 'elena@example.com', 
      date: '22.06.2026', amount: '89 990 ₽', status: 'shipped', 
      items: [
        { name: 'MacBook Air M3', qty: 1, price: '89 990 ₽' },
        { name: 'Чехол для MacBook', qty: 1, price: '2 990 ₽' },
        { name: 'USB-C хаб', qty: 1, price: '1 990 ₽' }
      ],
      phone: '+7 (999) 345-67-89',
      address: 'Казань, ул. Баумана, 5, кв. 78', 
      payment: 'Карта Mastercard **** 8901' 
    },
    { 
      id: '#1086', customer: 'Максим Петров', email: 'max@example.com', 
      date: '22.06.2026', amount: '3 290 ₽', status: 'pending', 
      items: [
        { name: 'Кабель USB-C 2м', qty: 2, price: '1 645 ₽' }
      ],
      phone: '+7 (999) 456-78-90',
      address: 'Новосибирск, ул. Ленина, 34, кв. 56', 
      payment: 'Ожидает оплаты' 
    },
    { 
      id: '#1085', customer: 'Ольга Иванова', email: 'olga@example.com', 
      date: '21.06.2026', amount: '156 700 ₽', status: 'delivered', 
      items: [
        { name: 'iPad Pro 12.9"', qty: 1, price: '120 990 ₽' },
        { name: 'Apple Pencil', qty: 1, price: '12 990 ₽' },
        { name: 'Smart Keyboard', qty: 1, price: '22 720 ₽' }
      ],
      phone: '+7 (999) 567-89-01',
      address: 'Екатеринбург, ул. Мира, 22, кв. 90', 
      payment: 'Карта Visa **** 2345' 
    },
    { 
      id: '#1084', customer: 'Сергей Волков', email: 'sergey@example.com', 
      date: '21.06.2026', amount: '24 990 ₽', status: 'cancelled', 
      items: [
        { name: 'Apple Watch Series 9', qty: 1, price: '24 990 ₽' }
      ],
      phone: '+7 (999) 678-90-12',
      address: 'Ростов-на-Дону, ул. Пушкина, 15, кв. 3', 
      payment: 'Возврат оформлен' 
    },
    { 
      id: '#1083', customer: 'Татьяна Мороз', email: 'tatyana@example.com', 
      date: '20.06.2026', amount: '67 500 ₽', status: 'processing', 
      items: [
        { name: 'Samsung Galaxy S24', qty: 1, price: '65 990 ₽' },
        { name: 'Чехол-книжка', qty: 1, price: '1 510 ₽' }
      ],
      phone: '+7 (999) 789-01-23',
      address: 'Краснодар, ул. Красная, 45, кв. 67', 
      payment: 'Карта Visa **** 6789' 
    },
    { 
      id: '#1082', customer: 'Игорь Смирнов', email: 'igor@example.com', 
      date: '20.06.2026', amount: '5 490 ₽', status: 'delivered', 
      items: [
        { name: 'Внешний аккумулятор 20000 mAh', qty: 1, price: '5 490 ₽' }
      ],
      phone: '+7 (999) 890-12-34',
      address: 'Воронеж, ул. Плехановская, 8, кв. 23', 
      payment: 'Карта Mastercard **** 3456' 
    },
    { 
      id: '#1081', customer: 'Наталья Кузнецова', email: 'natalya@example.com', 
      date: '19.06.2026', amount: '32 990 ₽', status: 'shipped', 
      items: [
        { name: 'Наушники Sony WH-1000XM5', qty: 1, price: '32 990 ₽' }
      ],
      phone: '+7 (999) 901-23-45',
      address: 'Самара, ул. Молодогвардейская, 55, кв. 34', 
      payment: 'Карта Visa **** 7890' 
    },
    { 
      id: '#1080', customer: 'Павел Орлов', email: 'pavel@example.com', 
      date: '19.06.2026', amount: '11 200 ₽', status: 'processing', 
      items: [
        { name: 'Клавиатура Logitech MX Keys', qty: 1, price: '11 200 ₽' }
      ],
      phone: '+7 (999) 012-34-56',
      address: 'Уфа, ул. Ленина, 10, кв. 89', 
      payment: 'SberPay' 
    }
  ],
  
  // Статусы заказов
  statuses: [
    { key: 'pending',    label: 'Ожидает',      color: 'warning' },
    { key: 'processing', label: 'В обработке',  color: 'info' },
    { key: 'shipped',    label: 'В пути',       color: 'primary' },
    { key: 'delivered',  label: 'Доставлен',    color: 'success' },
    { key: 'cancelled',  label: 'Отменён',      color: 'danger' }
  ],
  
  // Данные для графика продаж
  chartData: {
    week: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      values: [124000, 98000, 156000, 189000, 210000, 167000, 143000]
    },
    month: {
      labels: ['1 нед', '2 нед', '3 нед', '4 нед'],
      values: [890000, 1020000, 1150000, 987000]
    }
  },
  
  // Топ-товары
  topProducts: [
    { name: 'iPhone 15 Pro',       sales: 145, percentage: 100, revenue: '17 400 550 ₽' },
    { name: 'AirPods Pro',         sales: 98,  percentage: 68,  revenue: '2 450 000 ₽' },
    { name: 'MacBook Air M3',      sales: 67,  percentage: 46,  revenue: '8 040 000 ₽' },
    { name: 'Samsung Galaxy S24',  sales: 55,  percentage: 38,  revenue: '4 950 000 ₽' },
    { name: 'Apple Watch Series 9',sales: 42,  percentage: 29,  revenue: '2 100 000 ₽' }
  ]
};

// Вспомогательная функция: получить статус по ключу
function getStatus(key) {
  return dashboardData.statuses.find(s => s.key === key) || 
         { key: key, label: key, color: 'secondary' };
}