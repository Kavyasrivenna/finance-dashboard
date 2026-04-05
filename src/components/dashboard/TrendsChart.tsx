import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { format, parseISO } from 'date-fns';
import { formatCurrency } from '../../utils/formatCurrency';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const TrendsChart = ({ filter }: { filter: 'weekly' | 'monthly' }) => {
  const transactions = useFinanceStore((state) => state.transactions);
  const darkMode = useFinanceStore((state) => state.darkMode);

  const { labels, dataPoints, lastValue } = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let currentBalance = 0;

    const dailyData = sorted.reduce((acc, curr) => {
      const dateKey = format(parseISO(curr.date), 'MMM dd');

      if (curr.type === 'Income') currentBalance += curr.amount;
      else currentBalance -= curr.amount;

      const existing = acc.find(item => item.date === dateKey);
      if (existing) {
        existing.balance = currentBalance;
      } else {
        acc.push({ date: dateKey, balance: currentBalance });
      }

      return acc;
    }, [] as { date: string; balance: number }[]);

    const filtered =
      filter === 'weekly'
        ? dailyData.slice(-7)
        : dailyData;

    return {
      labels: filtered.map(d => d.date),
      dataPoints: filtered.map(d => d.balance),
      lastValue: filtered.length ? filtered[filtered.length - 1].balance : 0
    };
  }, [transactions, filter]);

  const textColor = darkMode ? '#e2e8f0' : '#0f172a';
  const gridColor = darkMode ? '#334155' : '#e2e8f0';

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Balance',
        data: dataPoints,
        borderColor: '#4f46e5',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(79, 70, 229, 0.4)');
          gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: gridColor,
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context: any) {
            return ' ' + formatCurrency(context.raw);
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          callback: (value: any) => formatCurrency(value)
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
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
            Balance Trend
            <span className="text-sm font-medium text-muted-foreground">
              Current: {formatCurrency(lastValue)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <Line data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};