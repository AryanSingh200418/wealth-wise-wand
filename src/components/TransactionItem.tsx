import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
}

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isIncome = transaction.type === "income";
  
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-card transition-shadow">
      <div className="flex items-center space-x-4">
        <div className={cn(
          "p-2 rounded-lg",
          isIncome ? "bg-income-light" : "bg-expense-light"
        )}>
          {isIncome ? (
            <ArrowUpCircle className="h-5 w-5 text-income" />
          ) : (
            <ArrowDownCircle className="h-5 w-5 text-expense" />
          )}
        </div>
        <div>
          <p className="font-medium text-card-foreground">{transaction.description}</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{transaction.date}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Badge variant="secondary" className="text-xs">
          {transaction.category}
        </Badge>
        <span className={cn(
          "font-semibold",
          isIncome ? "text-income" : "text-expense"
        )}>
          {isIncome ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
        </span>
      </div>
    </div>
  );
};