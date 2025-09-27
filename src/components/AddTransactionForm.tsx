import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddTransactionFormProps {
  onAdd: (transaction: {
    amount: number;
    category: string;
    description: string;
    type: "income" | "expense";
    date: string;
  }) => void;
  onCancel: () => void;
  className?: string;
}

const categories = {
  income: ["Salary", "Freelance", "Investment", "Business", "Other Income"],
  expense: ["Food", "Transportation", "Housing", "Entertainment", "Healthcare", "Shopping", "Utilities", "Other"]
};

export const AddTransactionForm = ({ onAdd, onCancel, className }: AddTransactionFormProps) => {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    onAdd({
      amount: parseFloat(amount),
      category,
      description,
      type,
      date: new Date().toLocaleDateString()
    });

    // Reset form
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <Card className={cn("shadow-card border-2", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Add Transaction</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={type === "income" ? "income" : "outline"}
              onClick={() => setType("income")}
              className="w-full"
            >
              Income
            </Button>
            <Button
              type="button"
              variant={type === "expense" ? "expense" : "outline"}
              onClick={() => setType("expense")}
              className="w-full"
            >
              Expense
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories[type].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant={type}
            disabled={!amount || !category || !description}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add {type === "income" ? "Income" : "Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};