import { useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';
import { ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export const OverviewCards = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const { income, expenses, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'Income') {
          acc.income += curr.amount;
          acc.balance += curr.amount;
        } else {
          acc.expenses += curr.amount;
          acc.balance -= curr.amount;
        }
        return acc;
      },
      { income: 0, expenses: 0, balance: 0 }
    );
  }, [transactions]);

  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : '0';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      className="grid gap-4 md:grid-cols-3"
    >
      <motion.div variants={cardVariants} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="h-full border-primary/20 bg-card/80 backdrop-blur-sm shadow-sm md:shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text">{formatCurrency(balance)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Savings rate: {savingsRate}%
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="h-full border-success/20 bg-card/80 backdrop-blur-sm shadow-sm md:shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
            <div className="p-2 bg-success/10 rounded-full">
              <ArrowUpRight className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text">{formatCurrency(income)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Positive cash flow
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
        <Card className="h-full border-danger/20 bg-card/80 backdrop-blur-sm shadow-sm md:shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <div className="p-2 bg-danger/10 rounded-full">
              <ArrowDownRight className="h-4 w-4 text-danger" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-text">{formatCurrency(expenses)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Keep spending in check
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};