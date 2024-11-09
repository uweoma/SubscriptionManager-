const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscription');

// Create a new subscription
router.post('/', async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all subscriptions
router.get('/', async (req, res) => {
  const subscriptions = await Subscription.findAll();
  res.json(subscriptions);
});

// Update a subscription
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const subscription = await Subscription.findByPk(id);
    subscription.update(req.body);
    res.json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a subscription
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Subscription.destroy({ where: { id } });
  res.json({ message: "Subscription deleted" });
});

// Analytics endpoint
router.get('/analytics', async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll();

    const monthlySpending = subscriptions.reduce((total, sub) => {
      const costPerMonth = sub.frequency === 'monthly' ? sub.cost : sub.cost / 12;
      return total + costPerMonth;
    }, 0);

    const categorySpending = subscriptions.reduce((acc, sub) => {
      acc[sub.category] = (acc[sub.category] || 0) + sub.cost;
      return acc;
    }, {});

    res.json({
      monthlySpending: monthlySpending.toFixed(2),
      categorySpending,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
