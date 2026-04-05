import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { formatCurrency } from '../../utils/formatCurrency';
import { motion } from 'framer-motion';
import { parseISO } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b'];

export const SpendingChart = ({ filter }: { filter: 'weekly' | 'monthly' }) => {
  const transactions = useFinanceStore((state) => state.transactions);
  const darkMode = useFinanceStore((state) => state.darkMode);

  const { labels, dataPoints, topCategory } = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');

    const sortedByDate = [...expenses].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const filtered =
      filter === 'weekly'
        ? sortedByDate.slice(-7)
        : sortedByDate;

    const categoryTotals = filtered.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    const sorted = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      labels: sorted.map(i => i.name),
      dataPoints: sorted.map(i => i.value),
      topCategory: sorted.length ? sorted[0] : null
    };
  }, [transactions, filter]);

  const textColor = darkMode ? '#e2e8f0' : '#0f172a';
  const gridColor = darkMode ? '#334155' : '#e2e8f0';

  const chartData = {
    labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: COLORS,
        borderWidth: 2,
        borderColor: darkMode ? '#1e293b' : '#ffffff',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context: any) {
            return ` ${context.label}: ${formatCurrency(context.raw)}`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Spending by Category
            {topCategory && (
              <span className="text-xs text-muted-foreground">
                Top: {topCategory.name}
              </span>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-[300px] w-full">
            {dataPoints.length > 0 ? (
              <Doughnut data={chartData} options={options} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No expenses to show.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};