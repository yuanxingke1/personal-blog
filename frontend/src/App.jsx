import React from 'react';
import Layout from './components/Layout';
import './App.css';

function App() {
  // 模拟文章数据
  const articles = [
    {
      id: 1,
      title: '欢迎来到我的个人博客',
      excerpt: '这是我的第一篇博客文章，介绍一下我的博客内容和计划...',
      date: '2026-03-01',
      category: '生活',
      tags: ['博客', '介绍']
    },
    {
      id: 2,
      title: '前端开发的最佳实践',
      excerpt: '分享一些前端开发中的最佳实践和技巧...',
      date: '2026-02-28',
      category: '技术',
      tags: ['前端', '开发', '最佳实践']
    },
    {
      id: 3,
      title: '如何提高代码质量',
      excerpt: '探讨代码质量的重要性以及如何提高代码质量...',
      date: '2026-02-25',
      category: '技术',
      tags: ['代码质量', '编程']
    }
  ];

  return (
    <Layout>
      {/* 英雄区域 */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          分享知识，记录生活
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          这里是我的个人博客，记录技术分享、生活感悟和学习心得
        </p>
        <div className="mt-8">
          <a 
            href="/subscribe" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-lg"
          >
            订阅我的博客
          </a>
        </div>
      </section>

      {/* 文章列表 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {article.date}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                <a href={`/blog/${article.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">
                    {tag}
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
      </section>
    </Layout>
  );
}

export default App;
