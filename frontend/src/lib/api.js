/**
 * API 配置和工具函数
 */

// API 基础 URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * 通用 API 请求函数
 * @param {string} endpoint - API 端点
 * @param {Object} options - 请求选项
 * @returns {Promise} - 返回请求结果
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API 请求失败: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 请求错误:', error);
    throw error;
  }
};

/**
 * 获取文章列表
 * @returns {Promise} - 文章列表
 */
export const getArticles = () => {
  return apiRequest('/api/articles');
};

/**
 * 获取单个文章
 * @param {number} id - 文章 ID
 * @returns {Promise} - 文章详情
 */
export const getArticle = (id) => {
  return apiRequest(`/api/articles/${id}`);
};

/**
 * 添加订阅者
 * @param {Object} subscriber - 订阅者信息
 * @returns {Promise} - 订阅结果
 */
export const addSubscriber = (subscriber) => {
  return apiRequest('/api/subscribers', {
    method: 'POST',
    body: JSON.stringify(subscriber),
  });
};

/**
 * 取消订阅
 * @param {Object} data - 取消订阅信息
 * @returns {Promise} - 取消订阅结果
 */
export const unsubscribe = (data) => {
  return apiRequest('/api/subscribers/unsubscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};