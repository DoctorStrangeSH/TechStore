// ============================================
// TechStore Dashboard v2.0 — Переключатель темы
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle-btn');
  
  if (!themeToggle) {
    console.error('❌ Кнопка темы не найдена! Ищем .theme-toggle-btn');
    return;
  }
  
  console.log('✅ Кнопка темы найдена');
  
  // Применяем сохранённую тему
  const savedTheme = localStorage.getItem('techstore-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    updateThemeIcon(true);
  }
  
  // Переключение по клику
  themeToggle.addEventListener('click', function() {
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    
    if (isDark) {
      document.documentElement.removeAttribute('data-bs-theme');
      localStorage.setItem('techstore-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('techstore-theme', 'dark');
    }
    
    updateThemeIcon(!isDark);
    
    // Обновляем график
    const activePeriod = document.querySelector('#chart-tabs .active')?.dataset?.period || 'week';
    if (typeof initSalesChart === 'function') {
      setTimeout(() => initSalesChart(activePeriod), 300);
    }
  });
  
  console.log('🎨 Тема готова. Текущая:', document.documentElement.getAttribute('data-bs-theme') || 'light');
});

function updateThemeIcon(isDark) {
  const icon = document.querySelector('.theme-toggle-btn i');
  if (!icon) return;
  
  icon.className = isDark ? 'bi bi-sun-fill fs-5' : 'bi bi-moon-stars-fill fs-5';
}