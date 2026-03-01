import React, { useState, useEffect } from 'react';

const BlogList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
        // 使用模拟数据作为备用
        setArticles([
          {
            id: 1,
            title: '欢迎来到我的个人博客',
            excerpt: '这是我的第一篇博客文章，介绍一下我的博客内容和计划...',
            createdAt: '2026-03-01T00:00:00Z',
            category: { name: '生活' },
            tags: [{ name: '博客' }, { name: '介绍' }]
          },
          {
            id: 2,
            title: '前端开发的最佳实践',
            excerpt: '分享一些前端开发中的最佳实践和技巧...',
            createdAt: '2026-02-28T00:00:00Z',
            category: { name: '技术' },
            tags: [{ name: '前端' }, { name: '开发' }, { name: '最佳实践' }]
          },
          {
            id: 3,
            title: '如何提高代码质量',
            excerpt: '探讨代码质量的重要性以及如何提高代码质量...',
            createdAt: '2026-02-25T00:00:00Z',
            category: { name: '技术' },
            tags: [{ name: '代码质量' }, { name: '编程' }]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">加载中...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-gray-600 dark:text-gray-400">显示的是模拟数据</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        博客文章
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 article-card transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {article.category?.name || '未分类'}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                <a href={`/blog/${article.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags?.map((tag, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">
                    {tag.name}
                  </span>
                ))}
              </div>
              <a 
                href={`/blog/${article.id}`} 
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                阅读更多 →
              </a>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">暂无文章</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;