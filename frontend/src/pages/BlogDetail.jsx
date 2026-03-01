import React, { useState, useEffect } from 'react';

const BlogDetail = ({ match }) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const articleId = match?.params?.id || 1;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/articles/${articleId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
        // 使用模拟数据作为备用
        setArticle({
          id: articleId,
          title: '欢迎来到我的个人博客',
          content: `<h2>关于这个博客</h2><p>这是一个个人技术博客，主要分享前端开发、后端技术、编程技巧等内容。</p><h3>博客目标</h3><p>通过分享技术知识，帮助更多开发者成长，同时记录自己的学习历程。</p><h3>内容分类</h3><ul><li>前端开发</li><li>后端技术</li><li>生活感悟</li><li>学习笔记</li></ul>`,
          createdAt: '2026-03-01T00:00:00Z',
          category: { name: '生活' },
          tags: [{ name: '博客' }, { name: '介绍' }]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">加载中...</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || '文章不存在'}</p>
        <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
          返回文章列表
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <a href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
          ← 返回列表
        </a>
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            {article.category?.name || '未分类'}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {new Date(article.createdAt).toLocaleDateString('zh-CN')}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          {article.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags?.map((tag, index) => (
            <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">
              {tag.name}
            </span>
          ))}
        </div>

        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* 评论区 */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          评论
        </h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-4">
                <span className="text-gray-600 dark:text-gray-400 font-medium">U</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">用户1</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  这篇文章写得很棒，学到了很多东西！
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  2026-03-01
                </p>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-4">
                <span className="text-gray-600 dark:text-gray-400 font-medium">U</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">用户2</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  期待更多精彩内容！
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  2026-03-02
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 评论表单 */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
            发表评论
          </h3>
          <div className="space-y-4">
            <textarea 
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              rows="4"
              placeholder="写下你的评论..."
            ></textarea>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              提交评论
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;