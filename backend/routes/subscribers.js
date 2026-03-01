const express = require('express');
const { Subscriber } = require('../models');
const router = express.Router();

// 获取订阅者列表
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 添加订阅者
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // 检查邮箱是否已存在
    const existingSubscriber = await Subscriber.findOne({ where: { email } });
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // 如果已取消订阅，重新激活
        await existingSubscriber.update({ status: 'active', name });
        return res.json({ message: 'Subscription reactivated successfully' });
      }
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const subscriber = await Subscriber.create({
      email,
      name
    });

    res.status(201).json({ message: 'Subscription successful', subscriber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 取消订阅
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    const subscriber = await Subscriber.findOne({ where: { email } });
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    await subscriber.update({ status: 'unsubscribed' });
    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除订阅者
router.delete('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findByPk(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    await subscriber.destroy();
    res.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;