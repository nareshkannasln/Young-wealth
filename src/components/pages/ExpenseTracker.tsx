import React, { useState } from 'react';


type CategoryKey = 'needs' | 'wants' | 'savings';
const categories: { key: CategoryKey; label: string; color: string }[] = [
  { key: 'needs', label: 'Needs', color: 'bg-blue-500' },
  { key: 'wants', label: 'Wants', color: 'bg-yellow-500' },
  { key: 'savings', label: 'Savings', color: 'bg-green-500' },
];

export const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<{ amount: number; category: CategoryKey; note: string }[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('needs');
  const [note, setNote] = useState('');

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setExpenses([...expenses, { amount: parseFloat(amount), category: category as CategoryKey, note }]);
    setAmount('');
    setNote('');
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const split: Record<CategoryKey, number> = {
    needs: expenses.filter(e => e.category === 'needs').reduce((s, e) => s + e.amount, 0),
    wants: expenses.filter(e => e.category === 'wants').reduce((s, e) => s + e.amount, 0),
    savings: expenses.filter(e => e.category === 'savings').reduce((s, e) => s + e.amount, 0),
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Expense Tracker (50-30-20 Rule)</h2>
      <form onSubmit={addExpense} className="flex gap-2 mb-4">
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          className="input input-bordered w-24"
          required
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="input input-bordered">
          {categories.map(c => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Note (optional)"
          className="input input-bordered flex-1"
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Today's Expenses</h3>
        <ul>
          {expenses.map((e, i) => (
            <li key={i} className="mb-1 text-sm">
              <span className="font-medium">₹{e.amount.toFixed(2)}</span> - {categories.find(c => c.key === e.category)?.label} {e.note && `- ${e.note}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category Split</h3>
        <div className="flex gap-4">
          {categories.map(c => (
            <div key={c.key} className={`p-2 rounded ${c.color} text-white w-1/3 text-center`}>
              <div className="text-lg font-bold">₹{split[c.key].toFixed(2)}</div>
              <div className="text-xs">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Advice</h3>
        <p className="text-sm">
          Needs: 50% (₹{(total * 0.5).toFixed(2)}), Wants: 30% (₹{(total * 0.3).toFixed(2)}), Savings: 20% (₹{(total * 0.2).toFixed(2)})
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {split.needs > total * 0.5 && 'You are spending more than 50% on needs. Try to reduce!'}
          {split.wants > total * 0.3 && ' You are spending more than 30% on wants. Watch your wants!'}
          {split.savings < total * 0.2 && ' Try to save at least 20% of your money!'}
        </p>
      </div>
    </div>
  );
};
