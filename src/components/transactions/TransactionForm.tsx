import { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import type { Transaction } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface TransactionFormProps {
  onSuccess: () => void;
  initialData?: Transaction;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess, initialData }) => {
  const { addTransaction, updateTransaction } = useFinanceStore();

  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    amount: initialData?.amount ? initialData.amount.toString() : '',
    category: initialData?.category || 'General',
    type: initialData?.type || 'Expense',
    date: initialData?.date
      ? new Date(initialData.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      description: formData.description.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category.trim(),
      type: formData.type as 'Income' | 'Expense',
      date: new Date(formData.date).toISOString()
    };

    if (initialData) {
      updateTransaction(initialData.id, payload);
    } else {
      addTransaction(payload);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text mb-1">Description</label>
        <Input
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What was this for?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Amount</label>
          <Input
            required
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">Date</label>
          <Input
            required
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Type</label>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={[
              { label: 'Expense', value: 'Expense' },
              { label: 'Income', value: 'Income' }
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">Category</label>
          <Input
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Food, Salary..."
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          {initialData ? 'Save Changes' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  );
};