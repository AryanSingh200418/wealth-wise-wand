import { useState } from "react";
import { TransactionItem } from "@/components/TransactionItem";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter } from "lucide-react";

// Mock expanded transaction data
const allTransactions = [
  { id: "1", amount: 80000, category: "Salary", description: "Monthly Salary", date: "2024-01-15", type: "income" as const },
  { id: "2", amount: -2500, category: "Food", description: "Grocery Shopping", date: "2024-01-14", type: "expense" as const },
  { id: "3", amount: -1200, category: "Transportation", description: "Fuel", date: "2024-01-13", type: "expense" as const },
  { id: "4", amount: 15000, category: "Freelance", description: "Web Design Project", date: "2024-01-12", type: "income" as const },
  { id: "5", amount: -850, category: "Food", description: "Restaurant Bill", date: "2024-01-11", type: "expense" as const },
  { id: "6", amount: -3200, category: "Housing", description: "Electricity Bill", date: "2024-01-10", type: "expense" as const },
  { id: "7", amount: 5000, category: "Investment", description: "Dividend Payment", date: "2024-01-09", type: "income" as const },
  { id: "8", amount: -1500, category: "Healthcare", description: "Medical Checkup", date: "2024-01-08", type: "expense" as const },
  { id: "9", amount: -2800, category: "Entertainment", description: "Movie & Dinner", date: "2024-01-07", type: "expense" as const },
  { id: "10", amount: 2000, category: "Other Income", description: "Cashback Rewards", date: "2024-01-06", type: "income" as const },
];

export const Transactions = () => {
  const [transactions, setTransactions] = useState(allTransactions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

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

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = [...new Set(transactions.map(t => t.category))];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
            <p className="text-muted-foreground">Manage all your income and expenses</p>
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

        {/* Filters */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found matching your filters.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};