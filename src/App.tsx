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

  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <Layout role={role} setRole={setRole}>
      <div className="space-y-6">
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of your financial activity
          </p>
        </div>

        <OverviewCards />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TrendsChart />
          <div className="flex flex-col gap-6 md:col-span-1">
            <SpendingChart />
            <Insights />
          </div>
        </div>

        <div className="mt-6">
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