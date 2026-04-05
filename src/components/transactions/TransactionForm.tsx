import { useState } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import type { Transaction } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

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
      toast.success('Transaction updated!');
    } else {
      addTransaction(payload);
      toast.success('Transaction added!');
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
            name="amount"
            value={formData.amount}
            onChange={handleChange}
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
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={[
            { label: 'Expense', value: 'Expense' },
            { label: 'Income', value: 'Income' }
          ]}
        />

        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          {initialData ? 'Save Changes' : 'Add Transaction'}
        </Button>
      </div>

    </form>
  );
};