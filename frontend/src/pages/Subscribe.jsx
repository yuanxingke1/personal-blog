import React, { useState } from 'react';

const Subscribe = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || '订阅失败');
      }

      setSuccess(true);
      setFormData({ name: '', email: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        订阅我的博客
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          订阅我的博客，及时获取最新的技术分享和生活感悟。我会定期发送更新，不会发送垃圾邮件。
        </p>

        {success ? (
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-md mb-6">
            <h3 className="font-medium mb-2">订阅成功！</h3>
            <p>感谢您的订阅，我会定期给您发送最新内容。</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md mb-6">
            <h3 className="font-medium mb-2">订阅失败</h3>
            <p>{error}</p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
              姓名（可选）
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="请输入您的姓名"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
              邮箱地址 *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="请输入您的邮箱地址"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loading mr-2"></div>
                订阅中...
              </div>
            ) : (
              '立即订阅'
            )}
          </button>
        </form>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-6">
          订阅即表示您同意接收我的邮件更新。您可以随时取消订阅。
        </p>
      </div>

      {/* 取消订阅表单 */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          取消订阅
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          如果您不想再接收我的邮件，可以在这里取消订阅。
        </p>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            // 这里可以实现取消订阅的逻辑
            alert(`已提交取消订阅请求：${email}`);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="unsubscribe-email" className="block text-gray-700 dark:text-gray-300 mb-2">
              邮箱地址 *
            </label>
            <input
              type="email"
              id="unsubscribe-email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="请输入您的邮箱地址"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            取消订阅
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;