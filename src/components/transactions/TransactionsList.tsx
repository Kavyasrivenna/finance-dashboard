import { useState, useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { format, parseISO } from 'date-fns';
import { Pencil, Trash2, Search, ArrowUpDown, Inbox } from 'lucide-react';
import type { Transaction } from '../../types';
import { Modal } from '../ui/Modal';
import { TransactionForm } from './TransactionForm';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionsList = () => {
  const { transactions, userRole, deleteTransaction } = useFinanceStore();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
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
      return matchesSearch && matchesType;
    });

    result.sort((a, b) => {
      if (sortBy === 'date') {
        const valA = new Date(a.date).getTime();
        const valB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });

    return result;
  }, [transactions, search, filterType, sortBy, sortOrder]);

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filteredAndSorted.map(t => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount
    ]);

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <CardTitle>Recent Transactions</CardTitle>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={exportCSV}>
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
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-4 py-3 cursor-pointer hover:text-text" onClick={() => toggleSort('date')}>
                  <div className="flex items-center gap-1">
                    Date <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 cursor-pointer hover:text-text" onClick={() => toggleSort('amount')}>
                  <div className="flex items-center gap-1">
                    Amount <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                {userRole === 'Admin' && <th className="px-4 py-3 text-right">Actions</th>}
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {filteredAndSorted.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Inbox className="h-10 w-10 mb-3 text-muted-foreground/50" />
                        <p className="text-lg font-medium text-text">No transactions found</p>
                        <p className="text-sm mt-1">Try adjusting filters or add a new transaction.</p>
                      </div>
                    </td>
                  </tr>
                )}

                {filteredAndSorted.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-text">
                      {format(parseISO(transaction.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-4 py-3 font-medium text-text">
                      {transaction.description}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded-md text-xs">
                        {transaction.category}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-semibold ${transaction.type === 'Income' ? 'text-green-500' : 'text-red-400'}`}>
                      {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </td>

                    {userRole === 'Admin' && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(transaction)} className="h-8 w-8 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTransaction(transaction.id)}
                            className="h-8 w-8 p-0 text-danger hover:text-danger hover:bg-danger/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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