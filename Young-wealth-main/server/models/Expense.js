const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: String, enum: ['needs', 'wants', 'savings'], required: true },
  note: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;
