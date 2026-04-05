import { useState, useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { format, parseISO } from 'date-fns';
import { Pencil, Trash2, Search, ArrowUpDown } from 'lucide-react';
import type { Transaction } from '../../types';
import { Modal } from '../ui/Modal';
import { TransactionForm } from './TransactionForm';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const TransactionsList = () => {
  const { transactions, userRole, deleteTransaction } = useFinanceStore();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const filteredAndSorted = useMemo(() => {
    let result = transactions.filter(t => {
      const matchesSearch =
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());

      const matchesType = filterType === 'All' || t.type === filterType;

      const now = new Date();
      const transactionDate = new Date(t.date);

      let matchesDate = true;

      if (dateFilter === '7days') {
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);
        matchesDate = transactionDate >= last7;
      }

      if (dateFilter === '30days') {
        const last30 = new Date();
        last30.setDate(now.getDate() - 30);
        matchesDate = transactionDate >= last30;
      }

      if (dateFilter === 'month') {
        matchesDate =
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear();
      }

      return matchesSearch && matchesType && matchesDate;
    });

    result.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });

    return result;
  }, [transactions, search, filterType, dateFilter, sortBy, sortOrder]);

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
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
          <Button variant="secondary">
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

        {/* FILTER BAR */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">

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
            className="md:w-[150px]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { label: 'All Types', value: 'All' },
              { label: 'Income', value: 'Income' },
              { label: 'Expense', value: 'Expense' }
            ]}
          />

          <Select
            className="md:w-[160px]"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            options={[
              { label: 'All Time', value: 'All' },
              { label: 'Last 7 Days', value: '7days' },
              { label: 'Last 30 Days', value: '30days' },
              { label: 'This Month', value: 'month' }
            ]}
          />

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('date')}>
                  Date <ArrowUpDown className="inline h-3 w-3" />
                </th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => toggleSort('amount')}>
                  Amount <ArrowUpDown className="inline h-3 w-3" />
                </th>
                {userRole === 'Admin' && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {filteredAndSorted.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-border hover:bg-muted/30 transition"
                  >
                    <td className="px-4 py-3">
                      {format(parseISO(transaction.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-4 py-3">{transaction.description}</td>
                    <td className="px-4 py-3">{transaction.category}</td>
                    <td className={`px-4 py-3 font-semibold ${
                      transaction.type === 'Income' ? 'text-green-500' : 'text-red-400'
                    }`}>
                      {transaction.type === 'Income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>

                    {userRole === 'Admin' && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() => handleEdit(transaction)}
                            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-500"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm('Delete this transaction?')) {
                                deleteTransaction(transaction.id);
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