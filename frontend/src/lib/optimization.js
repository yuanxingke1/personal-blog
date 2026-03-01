/**
 * 性能优化工具函数
 */

/**
 * 图片懒加载
 * @param {string} selector - 图片选择器
 */
export const lazyLoadImages = (selector = 'img[data-src]') => {
  const images = document.querySelectorAll(selector);
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖处理后的函数
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {Function} 节流处理后的函数
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * 预加载关键资源
 * @param {Array} resources - 资源列表
 */
export const preloadResources = (resources = []) => {
  resources.forEach(resource => {
    if (resource.type === 'image') {
      const img = new Image();
      img.src = resource.url;
    } else if (resource.type === 'script') {
      const script = document.createElement('script');
      script.src = resource.url;
      script.async = true;
      document.head.appendChild(script);
    } else if (resource.type === 'style') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = resource.url;
      document.head.appendChild(link);
    }
  });
};

/**
 * 优化字体加载
 */
export const optimizeFontLoading = () => {
  // 这里可以添加字体加载优化逻辑
  // 例如使用 font-display: swap 或 Font Face Observer
};

/**
 * 检测页面性能指标
 * @returns {Promise<Object>} 性能指标
 */
export const getPerformanceMetrics = () => {
  return new Promise((resolve) => {
    if (typeof window.performance !== 'undefined' && window.performance.getEntriesByType) {
      const navigationEntries = window.performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        resolve({
          loadTime: navEntry.loadEventEnd - navEntry.startTime,
          domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.startTime,
          firstPaint: window.performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          firstContentfulPaint: window.performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
        });
      } else {
        resolve({ loadTime: 0, domContentLoaded: 0, firstPaint: 0, firstContentfulPaint: 0 });
      }
    } else {
      resolve({ loadTime: 0, domContentLoaded: 0, firstPaint: 0, firstContentfulPaint: 0 });
    }
  });
};