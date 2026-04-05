import { useState, useMemo, useEffect } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { format } from 'date-fns';
import { Pencil, Trash2, Search } from 'lucide-react';
import type { Transaction } from '../../types';
import { Modal } from '../ui/Modal';
import { TransactionForm } from './TransactionForm';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const TransactionsList = () => {
  const { transactions, userRole, deleteTransaction } = useFinanceStore();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleExportCSV = () => {
    if (!transactions.length) return;

    const headers = ['Date', 'Description', 'Category', 'Amount', 'Type'];

    const rows = transactions.map(t => {
      const d = new Date(t.date);
      const updatedDate = new Date(2025, d.getMonth(), d.getDate());

      return [
        format(updatedDate, 'dd MMMM yyyy'),
        t.description,
        t.category,
        t.amount,
        t.type
      ];
    });

    const csvContent =
      [headers, ...rows]
        .map(row => row.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAndSorted = useMemo(() => {
    let result = transactions.map(t => {
      const d = new Date(t.date);
      const updatedDate = new Date(2025, d.getMonth(), d.getDate());

      return {
        ...t,
        updatedDate
      };
    });

    result = result.filter(t => {
      const query = debouncedSearch.trim().toLowerCase();

      const matchesSearch =
        !query ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.amount.toString().includes(query) ||
        format(t.updatedDate, 'dd MMMM yyyy').toLowerCase().includes(query);

      const matchesType =
        filterType === 'All' || t.type === filterType;

      return matchesSearch && matchesType;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = a.updatedDate.getTime();
        const dateB = b.updatedDate.getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (sortBy === 'amount') {
        return sortOrder === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      return 0;
    });

    return result;
  }, [transactions, debouncedSearch, filterType, sortBy, sortOrder]);

  const toggleSort = (field: 'date' | 'amount') => {
    setSortBy(field);
    setSortOrder(prev =>
      sortBy === field ? (prev === 'asc' ? 'desc' : 'asc') : 'desc'
    );
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <CardTitle>Recent Transactions</CardTitle>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleExportCSV}>
            Export CSV
          </Button>

          {userRole === 'Admin' && (
            <Button onClick={() => setIsModalOpen(true)}>
              Add Transaction
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            className="md:w-[160px]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { label: 'All Types', value: 'All' },
              { label: 'Income', value: 'Income' },
              { label: 'Expense', value: 'Expense' }
            ]}
          />

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('date')}>
                  Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('amount')}>
                  Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                {userRole === 'Admin' && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {filteredAndSorted.map((t) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-border hover:bg-muted/30 transition"
                  >
                    <td className="px-4 py-3">
                      {format(t.updatedDate, 'dd MMMM yyyy')}
                    </td>
                    <td className="px-4 py-3">{t.description}</td>
                    <td className="px-4 py-3">{t.category}</td>
                    <td className={`px-4 py-3 font-semibold ${
                      t.type === 'Income' ? 'text-green-500' : 'text-red-400'
                    }`}>
                      {t.type === 'Income' ? '+' : '-'}
                      {t.amount}
                    </td>

                    {userRole === 'Admin' && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => handleEdit(t)}
                            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm('Delete this transaction?')) {
                                deleteTransaction(t.id);
                                toast.success('Deleted successfully');
                              }
                            }}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>
                      </td>
                    )}

                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

      </CardContent>

      <Modal
        isOpen={isModalOpen}
        onClose={closeForm}
        title={editingTransaction ? 'Edit Transaction' : 'New Transaction'}
      >
        <TransactionForm onSuccess={closeForm} initialData={editingTransaction || undefined} />
      </Modal>
    </Card>
  );
};