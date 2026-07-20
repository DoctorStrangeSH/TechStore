// ============================================
// TechStore Dashboard v2.0 — Основной скрипт
// ============================================

const ORDERS_PER_PAGE = 5;
let currentPage = 1;
let currentStatusFilter = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM загружен, инициализация...');
  
  initSidebar();
  initMobileSearch();
  initCounters();
  renderOrders();
  setupOrdersFilter();
  setupOrderSearch();
  setupChartTabs();
  initSalesChart('week');
  renderTopProducts();
  setupExportCSV();
  setupModalActions();
  handleResponsiveChanges();
  
  console.log('✅ Инициализация завершена');
});

// ========== САЙДБАР ==========
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.querySelector('.sidebar-toggle-btn');
  const closeBtn = document.querySelector('.sidebar-close-btn');
  
  console.log('📱 Инициализация сайдбара:', {
    sidebar: !!sidebar,
    overlay: !!overlay,
    toggleBtn: !!toggleBtn,
    closeBtn: !!closeBtn
  });
  
  if (!sidebar) {
    console.error('❌ Сайдбар не найден!');
    return;
  }
  
  if (!toggleBtn) {
    console.error('❌ Кнопка открытия сайдбара не найдена!');
    return;
  }
  
  function openSidebar() {
    console.log('📂 Открываем сайдбар');
    sidebar.classList.add('show');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  function closeSidebar() {
    console.log('📂 Закрываем сайдбар');
    sidebar.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  
  // Кнопка бургер-меню
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🍔 Клик по бургер-меню');
    
    if (sidebar.classList.contains('show')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
  
  // Кнопка закрытия в сайдбаре
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebar();
    });
  }
  
  // Закрытие по оверлею
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
  
  // Закрытие при клике на пункт меню
  sidebar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 767.98) {
        closeSidebar();
      }
    });
  });
  
  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('show')) {
      closeSidebar();
    }
  });
  
  console.log('✅ Сайдбар готов');
}

// ========== МОБИЛЬНЫЙ ПОИСК ==========
function initMobileSearch() {
  const searchToggle = document.querySelector('.mobile-search-toggle-btn');
  const searchBar = document.getElementById('mobileSearchBar');
  const searchClose = document.querySelector('.mobile-search-close-btn');
  const mobileSearchInput = document.getElementById('mobileOrderSearch');
  const desktopSearchInput = document.getElementById('orderSearch');
  
  if (!searchToggle || !searchBar) {
    console.warn('⚠️ Мобильный поиск не инициализирован');
    return;
  }
  
  searchToggle.addEventListener('click', () => {
    const isVisible = searchBar.style.display !== 'none';
    
    if (isVisible) {
      searchBar.style.display = 'none';
      if (mobileSearchInput) mobileSearchInput.value = '';
      searchQuery = '';
      currentPage = 1;
      renderOrders();
    } else {
      searchBar.style.display = 'block';
      if (mobileSearchInput) {
        setTimeout(() => mobileSearchInput.focus(), 100);
      }
    }
  });
  
  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchBar.style.display = 'none';
      if (mobileSearchInput) mobileSearchInput.value = '';
      searchQuery = '';
      currentPage = 1;
      renderOrders();
    });
  }
  
  if (mobileSearchInput) {
    let mobileDebounceTimer;
    mobileSearchInput.addEventListener('input', function() {
      clearTimeout(mobileDebounceTimer);
      mobileDebounceTimer = setTimeout(() => {
        searchQuery = this.value;
        if (desktopSearchInput) desktopSearchInput.value = this.value;
        currentPage = 1;
        renderOrders();
      }, 300);
    });
  }
}

// ========== KPI-СЧЁТЧИКИ ==========
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const decimalCounters = document.querySelectorAll('.counter-decimal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        if (el.classList.contains('counter')) {
          animateCounter(el, parseInt(el.dataset.target), false);
        } else if (el.classList.contains('counter-decimal')) {
          animateCounter(el, parseFloat(el.dataset.target), true);
        }
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(c => observer.observe(c));
  decimalCounters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, isDecimal) {
  const duration = 1500;
  const start = performance.now();
  
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    
    if (isDecimal) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.floor(current).toLocaleString('ru-RU');
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString('ru-RU');
    }
  }
  
  requestAnimationFrame(update);
}

// ========== ЗАКАЗЫ ==========
function getFilteredOrders() {
  let filtered = dashboardData.orders;
  
  if (currentStatusFilter !== 'all') {
    filtered = filtered.filter(o => o.status === currentStatusFilter);
  }
  
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(o => 
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.amount.toLowerCase().includes(q)
    );
  }
  
  return filtered;
}

function renderOrders() {
  const filteredOrders = getFilteredOrders();
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  
  if (currentPage > totalPages) currentPage = Math.max(1, totalPages);
  
  const start = (currentPage - 1) * ORDERS_PER_PAGE;
  const pageOrders = filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  
  const tbody = document.getElementById('orders-table-body');
  const cardsContainer = document.getElementById('orders-cards-container');
  
  if (filteredOrders.length === 0) {
    const emptyHTML = `
      <div class="text-center py-4 text-muted">
        <i class="bi bi-inbox fs-3 d-block mb-2"></i>
        Заказы не найдены
      </div>
    `;
    if (tbody) tbody.innerHTML = `<tr><td colspan="6">${emptyHTML}</td></tr>`;
    if (cardsContainer) cardsContainer.innerHTML = emptyHTML;
    
    document.getElementById('orders-info').textContent = 'Заказы не найдены';
    document.getElementById('orders-pagination').innerHTML = '';
    return;
  }
  
  // Десктопная таблица
  if (tbody) {
    tbody.innerHTML = pageOrders.map(order => {
      const status = getStatus(order.status);
      return `
        <tr>
          <td class="ps-4 fw-semibold">${order.id}</td>
          <td>
            <div class="fw-semibold">${order.customer}</div>
            <small class="text-muted">${order.email}</small>
          </td>
          <td class="text-muted small">${order.date}</td>
          <td class="fw-semibold">${order.amount}</td>
          <td>
            <span class="badge bg-${status.color} bg-opacity-10 text-${status.color} rounded-pill">
              ${status.label}
            </span>
          </td>
          <td class="text-end pe-4">
            <button class="btn btn-outline-secondary btn-sm rounded-3 view-order-btn" 
                    data-order-id="${order.id}" title="Подробнее">
              <i class="bi bi-eye"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
    
    // Только кнопка открывает модалку
    tbody.querySelectorAll('.view-order-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const order = dashboardData.orders.find(o => o.id === this.dataset.orderId);
        if (order) showOrderDetails(order);
      });
    });
  }
  
  // Мобильные карточки
  if (cardsContainer) {
    cardsContainer.innerHTML = pageOrders.map(order => {
      const status = getStatus(order.status);
      return `
        <div class="order-mobile-card p-3">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <span class="fw-bold">${order.id}</span>
              <span class="badge bg-${status.color} bg-opacity-10 text-${status.color} rounded-pill ms-2">
                ${status.label}
              </span>
            </div>
            <span class="fw-bold">${order.amount}</span>
          </div>
          <div class="small text-muted mb-1">${order.customer}</div>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${order.date}</small>
            <button class="btn btn-outline-primary btn-sm rounded-3 view-order-btn" 
                    data-order-id="${order.id}">
              <i class="bi bi-eye me-1"></i> Детали
            </button>
          </div>
        </div>
      `;
    }).join('');
    
    // Только кнопка "Детали" открывает модалку
    cardsContainer.querySelectorAll('.view-order-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const order = dashboardData.orders.find(o => o.id === this.dataset.orderId);
        if (order) showOrderDetails(order);
      });
    });
  }
  
  renderPagination(totalPages);
  document.getElementById('orders-info').textContent = 
    `Показано ${start + 1}–${Math.min(start + ORDERS_PER_PAGE, filteredOrders.length)} из ${filteredOrders.length}`;
}

function renderPagination(totalPages) {
  const container = document.getElementById('orders-pagination');
  if (!container || totalPages <= 1) {
    if (container) container.innerHTML = '';
    return;
  }
  
  let html = `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Назад">
        <i class="bi bi-chevron-left small"></i>
      </a>
    </li>
  `;
  
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `;
  }
  
  html += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Вперёд">
        <i class="bi bi-chevron-right small"></i>
      </a>
    </li>
  `;
  
  container.innerHTML = html;
  
  container.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = parseInt(this.dataset.page);
      const filteredOrders = getFilteredOrders();
      const maxPage = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
      if (page >= 1 && page <= maxPage) {
        currentPage = page;
        renderOrders();
      }
    });
  });
}

function setupOrdersFilter() {
  const filter = document.getElementById('statusFilter');
  if (!filter) return;
  
  filter.addEventListener('change', function() {
    currentStatusFilter = this.value;
    currentPage = 1;
    renderOrders();
  });
}

function setupOrderSearch() {
  const search = document.getElementById('orderSearch');
  if (!search) return;
  
  let debounceTimer;
  search.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = this.value;
      const mobileSearch = document.getElementById('mobileOrderSearch');
      if (mobileSearch) mobileSearch.value = this.value;
      currentPage = 1;
      renderOrders();
    }, 300);
  });
}

// ========== ГРАФИК ПРОДАЖ ==========
let salesChartInstance = null;

function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  return {
    line: isDark ? '#3d8bfd' : '#0d6efd',
    gradientStart: isDark ? 'rgba(61, 139, 253, 0.3)' : 'rgba(13, 110, 253, 0.25)',
    gradientEnd: 'rgba(13, 110, 253, 0.0)',
    grid: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
  };
}

function initSalesChart(period = 'week') {
  const canvas = document.getElementById('salesChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const data = dashboardData.chartData[period];
  const colors = getChartColors();
  const isMobile = window.innerWidth <= 767.98;
  
  if (salesChartInstance) {
    salesChartInstance.destroy();
  }
  
  const gradient = ctx.createLinearGradient(0, 0, 0, isMobile ? 200 : 280);
  gradient.addColorStop(0, colors.gradientStart);
  gradient.addColorStop(1, colors.gradientEnd);
  
  salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Выручка (₽)',
        data: data.values,
        fill: true,
        backgroundColor: gradient,
        borderColor: colors.line,
        borderWidth: isMobile ? 2 : 3,
        pointBackgroundColor: colors.line,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: isMobile ? 3 : 5,
        pointHoverRadius: isMobile ? 5 : 7,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#212529',
          titleFont: { size: isMobile ? 11 : 13 },
          bodyFont: { size: isMobile ? 10 : 12 },
          padding: isMobile ? 8 : 12,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: ctx => '₽ ' + ctx.parsed.y.toLocaleString('ru-RU')
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { 
            font: { size: isMobile ? 10 : 12 }, 
            color: colors.grid,
            maxTicksLimit: isMobile ? 4 : 7
          }
        },
        y: {
          beginAtZero: false,
          grid: { color: colors.grid },
          ticks: {
            font: { size: isMobile ? 9 : 11 },
            maxTicksLimit: isMobile ? 4 : 6,
            callback: value => value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' 
                           : value >= 1000 ? (value / 1000).toFixed(0) + 'K' : value
          }
        }
      },
      interaction: { intersect: false, mode: 'index' }
    }
  });
}

function setupChartTabs() {
  const tabs = document.getElementById('chart-tabs');
  if (!tabs) return;
  
  tabs.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
      tabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      initSalesChart(this.dataset.period);
    });
  });
}

// ========== ДЕТАЛИ ЗАКАЗА ==========
function showOrderDetails(order) {
  const status = getStatus(order.status);
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  
  document.getElementById('modal-order-id').textContent = order.id;
  document.getElementById('modal-order-date').textContent = order.date;
  document.getElementById('modal-customer').textContent = order.customer;
  document.getElementById('modal-contact').textContent = order.email;
  document.getElementById('modal-phone').textContent = order.phone;
  document.getElementById('modal-address').textContent = order.address;
  document.getElementById('modal-payment').textContent = order.payment;
  document.getElementById('modal-total').textContent = order.amount;
  
  const statusBadge = document.getElementById('modal-order-status');
  statusBadge.textContent = status.label;
  statusBadge.className = `badge fs-6 rounded-pill bg-${status.color} bg-opacity-10 text-${status.color}`;
  
  const itemsContainer = document.getElementById('modal-order-items');
  if (order.items && order.items.length > 0) {
    itemsContainer.innerHTML = order.items.map(item => `
      <tr>
        <td class="ps-3 fw-semibold">${item.name}</td>
        <td>${item.qty} шт.</td>
        <td class="text-end pe-3">${item.price}</td>
      </tr>
    `).join('');
  } else {
    itemsContainer.innerHTML = `
      <tr>
        <td colspan="3" class="text-center text-muted">Нет данных о товарах</td>
      </tr>
    `;
  }
  
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

function setupModalActions() {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  
  modal.querySelectorAll('.btn-action').forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.dataset.action;
      const orderId = document.getElementById('modal-order-id').textContent;
      const messages = {
        confirm: `Заказ ${orderId} подтверждён ✅`,
        edit: `Редактирование заказа ${orderId} ✏️`,
        cancel: `Заказ ${orderId} отменён ❌`
      };
      showToast(messages[action] || 'Действие выполнено', action === 'cancel' ? 'danger' : 'success');
      bootstrap.Modal.getInstance(modal).hide();
    });
  });
}

// ========== ТОСТ-УВЕДОМЛЕНИЯ ==========
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const icons = { success: 'check-circle-fill', danger: 'x-circle-fill', warning: 'exclamation-triangle-fill' };
  const icon = icons[type] || 'info-circle-fill';
  
  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center border-0 shadow-lg';
  toastEl.setAttribute('role', 'alert');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center gap-2">
        <i class="bi bi-${icon} text-${type} fs-5"></i>
        <span>${message}</span>
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Закрыть"></button>
    </div>
  `;
  
  container.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

// ========== ТОП-ТОВАРЫ ==========
function renderTopProducts() {
  const container = document.getElementById('top-products-container');
  if (!container) return;
  
  const isMobile = window.innerWidth <= 767.98;
  
  container.innerHTML = dashboardData.topProducts.map((product, index) => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="d-flex align-items-start gap-2 gap-md-3 p-2 p-md-3 border rounded-3 h-100 bg-light top-product-card">
        <div class="flex-shrink-0 rounded-3 bg-white d-flex align-items-center justify-content-center shadow-sm"
             style="width: ${isMobile ? '40px' : '56px'}; height: ${isMobile ? '40px' : '56px'};">
          <i class="bi bi-${getProductIcon(index)} fs-5 fs-md-4 text-primary"></i>
        </div>
        <div class="flex-grow-1 min-w-0">
          <div class="d-flex justify-content-between align-items-start mb-1">
            <h6 class="fw-bold mb-0 text-truncate small">${product.name}</h6>
            <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill small ms-2 flex-shrink-0">#${index + 1}</span>
          </div>
          <div class="d-flex justify-content-between small text-muted mb-1">
            <span>${product.sales} шт.</span>
            <span>${product.percentage}%</span>
          </div>
          <div class="progress mb-2" style="height: ${isMobile ? '6px' : '8px'};">
            <div class="progress-bar bg-${getProgressColor(index)}" role="progressbar" 
                 style="width: ${product.percentage}%;" 
                 aria-valuenow="${product.percentage}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <small class="text-muted"><i class="bi bi-wallet2 me-1"></i>${product.revenue}</small>
        </div>
      </div>
    </div>
  `).join('');
}

function getProductIcon(index) {
  const icons = ['phone', 'earbuds', 'laptop', 'phone-flip', 'smartwatch'];
  return icons[index] || 'box';
}

function getProgressColor(index) {
  const colors = ['primary', 'success', 'info', 'warning', 'secondary'];
  return colors[index] || 'secondary';
}

// ========== ЭКСПОРТ CSV ==========
function setupExportCSV() {
  const btn = document.getElementById('exportCSV');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    const orders = getFilteredOrders();
    if (orders.length === 0) {
      showToast('Нет данных для экспорта', 'warning');
      return;
    }
    
    let csv = '\uFEFF';
    csv += 'Заказ;Клиент;Email;Дата;Сумма (₽);Статус;Телефон;Адрес\n';
    
    orders.forEach(o => {
      const status = getStatus(o.status);
      csv += [
        o.id, o.customer, o.email, o.date,
        o.amount.replace(/\s/g, '').replace('₽', '').trim(),
        status.label, o.phone, o.address
      ].join(';') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `techstore-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast(`Экспортировано ${orders.length} заказов 📥`, 'success');
  });
}

// ========== АДАПТИВНЫЕ ИЗМЕНЕНИЯ ==========
function handleResponsiveChanges() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activePeriod = document.querySelector('#chart-tabs .active')?.dataset?.period || 'week';
      initSalesChart(activePeriod);
      renderTopProducts();
    }, 250);
  });
}