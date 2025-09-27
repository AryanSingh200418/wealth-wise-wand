import { useState } from "react";
import { FinanceCard } from "@/components/FinanceCard";
import { TransactionItem } from "@/components/TransactionItem";
import { BudgetProgress } from "@/components/BudgetProgress";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Plus,
  Car,
  Home,
  UtensilsCrossed,
  Gamepad2
} from "lucide-react";

// Mock data
const initialTransactions = [
  {
    id: "1",
    amount: 3200,
    category: "Salary",
    description: "Monthly Salary",
    date: "2024-01-15",
    type: "income" as const
  },
  {
    id: "2", 
    amount: -85.50,
    category: "Food",
    description: "Grocery Shopping",
    date: "2024-01-14",
    type: "expense" as const
  },
  {
    id: "3",
    amount: -45.00,
    category: "Transportation",
    description: "Gas Station",
    date: "2024-01-13",
    type: "expense" as const
  },
  {
    id: "4",
    amount: 500,
    category: "Freelance",
    description: "Web Design Project",
    date: "2024-01-12",
    type: "income" as const
  }
];

const budgets = [
  { category: "Food", spent: 285.50, budget: 400, icon: UtensilsCrossed },
  { category: "Transportation", spent: 180.00, budget: 200, icon: Car },
  { category: "Housing", spent: 1200.00, budget: 1200, icon: Home },
  { category: "Entertainment", spent: 95.00, budget: 150, icon: Gamepad2 }
];

export const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showAddForm, setShowAddForm] = useState(false);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const savings = balance * 0.2; // Assume 20% savings goal

  const handleAddTransaction = (newTransaction: {
    amount: number;
    category: string;
    description: string;
    type: "income" | "expense";
    date: string;
  }) => {
    const transaction = {
      id: Date.now().toString(),
      ...newTransaction,
      amount: newTransaction.type === "expense" ? -newTransaction.amount : newTransaction.amount
    };
    setTransactions([transaction, ...transactions]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finance Dashboard</h1>
            <p className="text-muted-foreground">Track your income, expenses, and savings</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            variant="default"
            size="lg"
            className="shadow-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Transaction
          </Button>
        </div>

        {/* Add Transaction Form */}
        {showAddForm && (
          <AddTransactionForm
            onAdd={handleAddTransaction}
            onCancel={() => setShowAddForm(false)}
            className="max-w-md mx-auto"
          />
        )}

        {/* Finance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FinanceCard
            title="Total Balance"
            amount={`$${balance.toFixed(2)}`}
            icon={Wallet}
            variant="balance"
            trend={{ value: "12.5%", isPositive: true }}
          />
          <FinanceCard
            title="Total Income"
            amount={`$${totalIncome.toFixed(2)}`}
            icon={TrendingUp}
            variant="income"
            trend={{ value: "8.2%", isPositive: true }}
          />
          <FinanceCard
            title="Total Expenses"
            amount={`$${totalExpenses.toFixed(2)}`}
            icon={TrendingDown}
            variant="expense"
            trend={{ value: "3.1%", isPositive: false }}
          />
          <FinanceCard
            title="Savings Goal"
            amount={`$${savings.toFixed(2)}`}
            icon={PiggyBank}
            variant="savings"
            trend={{ value: "15.7%", isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transactions.slice(0, 6).map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Budget Progress */}
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {budgets.map((budget) => (
                  <BudgetProgress
                    key={budget.category}
                    category={budget.category}
                    spent={budget.spent}
                    budget={budget.budget}
                    icon={budget.icon}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};