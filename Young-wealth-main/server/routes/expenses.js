const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

const Expense = require('../models/Expense');

// Get all expenses for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch expenses' });
  }
});

// Add new expense
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { amount, category, note } = req.body;
    const expense = await Expense.create({ userId: req.user._id, amount, category, note });
    res.json({ success: true, expense });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add expense' });
  }
});

// Delete expense
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.params.id, userId: req.user._id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete expense' });
  }
});

module.exports = router;
