import { useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { AlertCircle, TrendingDown, Clock, Activity } from 'lucide-react';
import { subMonths, isSameMonth, parseISO } from 'date-fns';
import { cn } from '../../utils/cn';

export const Insights = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const { highestCategory, largestExpense, percentageChange, smartInsight } = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');

    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    let highestCategory = { name: 'None', amount: 0 };
    for (const [key, value] of Object.entries(categoryTotals)) {
      if (value > highestCategory.amount) {
        highestCategory = { name: key, amount: value as number };
      }
    }

    const largestExpense = expenses.length
      ? expenses.reduce((prev, curr) =>
          curr.amount > prev.amount ? curr : prev
        )
      : { amount: 0, description: 'None' };

    const now = new Date();
    const prevMonth = subMonths(now, 1);

    const currentMonthTotal = expenses
      .filter(t => isSameMonth(parseISO(t.date), now))
      .reduce((sum, t) => sum + t.amount, 0);

    const prevMonthTotal = expenses
      .filter(t => isSameMonth(parseISO(t.date), prevMonth))
      .reduce((sum, t) => sum + t.amount, 0);

    let percentageChange = 0;
    if (prevMonthTotal > 0) {
      percentageChange = ((currentMonthTotal - prevMonthTotal) / prevMonthTotal) * 100;
    } else if (currentMonthTotal > 0) {
      percentageChange = 100;
    }

    let smartInsight = 'Your spending is stable.';
    if (percentageChange > 20) {
      smartInsight = 'Your expenses increased significantly this month.';
    } else if (percentageChange < -10) {
      smartInsight = 'Great job! You reduced your spending this month.';
    }

    return { highestCategory, largestExpense, percentageChange, smartInsight };
  }, [transactions]);

  return (
    <Card className="h-full border-muted bg-card/80 backdrop-blur-sm shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Financial Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        
        <div className="flex items-start space-x-3 p-3 bg-muted/40 border border-border rounded-lg shadow-sm transition-transform hover:scale-[1.02]">
          <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold">Monthly Spending</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Your spending this month is
              <span
                className={cn(
                  "font-bold mx-1 px-1.5 py-0.5 rounded-md text-xs",
                  percentageChange > 0
                    ? "bg-danger/10 text-danger"
                    : "bg-success/10 text-success"
                )}
              >
                {percentageChange > 0 ? '+' : ''}
                {percentageChange.toFixed(1)}%
              </span>
              vs last month.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {smartInsight}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 bg-muted/40 border border-border rounded-lg shadow-sm transition-transform hover:scale-[1.02]">
          <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" style={{ color: '#f59e0b' }} />
          <div>
            <h4 className="text-sm font-semibold">Highest Category</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Most spending went to{' '}
              <span className="font-semibold text-text">{highestCategory.name}</span>{' '}
              (<span className="font-semibold text-danger">{formatCurrency(highestCategory.amount)}</span>).
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 bg-muted/40 border border-border rounded-lg shadow-sm transition-transform hover:scale-[1.02]">
          <TrendingDown className="h-5 w-5 text-danger shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold">Largest Purchase</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Your largest buy was{' '}
              <span className="font-semibold text-text">
                {largestExpense.description || 'None'}
              </span>{' '}
              for{' '}
              <span className="font-semibold text-danger">
                {formatCurrency(largestExpense.amount)}
              </span>.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};