import { useEffect, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { OverviewCards } from './components/dashboard/OverviewCards';
import { TrendsChart } from './components/dashboard/TrendsChart';
import { SpendingChart } from './components/dashboard/SpendingChart';
import { Insights } from './components/dashboard/Insights';
import { TransactionsList } from './components/transactions/TransactionsList';

function App() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [role, setRole] = useState<'admin' | 'viewer'>('admin');
  const [filter, setFilter] = useState<'weekly' | 'monthly'>('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
    setTimeout(() => setLoading(false), 600);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <Layout role={role} setRole={setRole}>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="opacity-90 mt-1">
            Track and manage your financial activity
          </p>
        </div>

        {/* OVERVIEW */}
        <OverviewCards />

        {/* FILTER */}
        <div className="flex justify-end">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'weekly' | 'monthly')}
            className="bg-[#111] border border-gray-700 text-white px-3 py-1 rounded-lg"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* FULL WIDTH CHART */}
        <div className="w-full">
          <TrendsChart filter={filter} />
        </div>

        {/* PIE + INSIGHTS BELOW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SpendingChart filter={filter} />
          <Insights />
        </div>

        {/* TRANSACTIONS (NO EXTRA GAP) */}
        <div>
          <h2 className="text-xl font-semibold text-text mb-2">
            Recent Transactions
          </h2>

          <TransactionsList
            transactions={transactions}
            setTransactions={setTransactions}
            role={role}
          />
        </div>

      </div>
    </Layout>
  );
}

export default App;