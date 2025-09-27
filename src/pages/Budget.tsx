import { useState } from "react";
import { BudgetProgress } from "@/components/BudgetProgress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Target, UtensilsCrossed, Car, Home, Gamepad2, Heart, ShoppingBag } from "lucide-react";

const categoryIcons = {
  "Food": UtensilsCrossed,
  "Transportation": Car,
  "Housing": Home,
  "Entertainment": Gamepad2,
  "Healthcare": Heart,
  "Shopping": ShoppingBag,
};

interface Budget {
  id: string;
  category: string;
  budget: number;
  spent: number;
  icon: React.ComponentType<{ className?: string }>;
}

const initialBudgets: Budget[] = [
  { id: "1", category: "Food", spent: 8500, budget: 12000, icon: UtensilsCrossed },
  { id: "2", category: "Transportation", spent: 4500, budget: 6000, icon: Car },
  { id: "3", category: "Housing", spent: 25000, budget: 25000, icon: Home },
  { id: "4", category: "Entertainment", spent: 2800, budget: 4000, icon: Gamepad2 },
  { id: "5", category: "Healthcare", spent: 1500, budget: 3000, icon: Heart },
  { id: "6", category: "Shopping", spent: 3200, budget: 5000, icon: ShoppingBag },
];

export const Budget = () => {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleAddBudget = () => {
    if (!newCategory || !newAmount) return;
    
    const newBudget: Budget = {
      id: Date.now().toString(),
      category: newCategory,
      budget: parseFloat(newAmount),
      spent: 0,
      icon: categoryIcons[newCategory as keyof typeof categoryIcons] || Target
    };
    
    setBudgets([...budgets, newBudget]);
    setNewCategory("");
    setNewAmount("");
    setShowAddForm(false);
  };

  const handleEditBudget = (budget: Budget) => {
    setBudgets(budgets.map(b => b.id === budget.id ? budget : b));
    setEditingBudget(null);
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Budget Management</h1>
            <p className="text-muted-foreground">Set and track your spending limits</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            variant="default"
            size="lg"
            className="shadow-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Budget
          </Button>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalBudget.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card bg-gradient-expense text-expense-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card bg-gradient-savings text-savings-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{remainingBudget.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Budget Form */}
        {showAddForm && (
          <Card className="shadow-card border-2">
            <CardHeader>
              <CardTitle>Add New Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categoryIcons).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Budget Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={handleAddBudget} disabled={!newCategory || !newAmount}>
                  Add Budget
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Budget List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <div key={budget.id} className="relative">
              <BudgetProgress
                category={budget.category}
                spent={budget.spent}
                budget={budget.budget}
                icon={budget.icon}
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setEditingBudget(budget)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={() => handleDeleteBudget(budget.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Budget Modal */}
        {editingBudget && (
          <Card className="shadow-card border-2 max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Edit Budget: {editingBudget.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Budget Amount (₹)</Label>
                  <Input
                    type="number"
                    value={editingBudget.budget}
                    onChange={(e) => setEditingBudget({
                      ...editingBudget,
                      budget: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleEditBudget(editingBudget)}>
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditingBudget(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};