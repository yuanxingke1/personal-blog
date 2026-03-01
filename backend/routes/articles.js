const express = require('express');
const { Article, Category, Tag } = require('../models');
const router = express.Router();

// 获取文章列表
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { status: 'published' },
      include: [
        { model: Category },
        { model: Tag }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个文章
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag }
      ]
    });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建文章
router.post('/', async (req, res) => {
  try {
    const { title, content, excerpt, categoryId, tags } = req.body;
    
    const article = await Article.create({
      title,
      content,
      excerpt,
      categoryId,
      status: 'published'
    });

    // 处理标签
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        let tag = await Tag.findOne({ where: { name: tagName } });
        if (!tag) {
          tag = await Tag.create({ name: tagName, slug: tagName.toLowerCase().replace(/\s+/g, '-') });
        }
        await article.addTag(tag);
      }
    }

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新文章
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const { title, content, excerpt, categoryId, status } = req.body;
    await article.update({
      title,
      content,
      excerpt,
      categoryId,
      status
    });

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除文章
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await article.destroy();
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;