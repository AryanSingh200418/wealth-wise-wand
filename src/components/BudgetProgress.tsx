import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetProgressProps {
  category: string;
  spent: number;
  budget: number;
  icon?: React.ComponentType<{ className?: string }>;
}

export const BudgetProgress = ({ 
  category, 
  spent, 
  budget, 
  icon: Icon = Target 
}: BudgetProgressProps) => {
  const percentage = (spent / budget) * 100;
  const isOverBudget = percentage > 100;
  const isNearLimit = percentage > 80;

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center space-x-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span>{category}</span>
        </CardTitle>
        {isNearLimit && (
          <AlertTriangle className={cn(
            "h-4 w-4",
            isOverBudget ? "text-destructive" : "text-expense"
          )} />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className="font-medium">${spent.toFixed(2)}</span>
          </div>
          <Progress 
            value={Math.min(percentage, 100)} 
            className={cn(
              "h-2",
              isOverBudget && "bg-red-100"
            )}
          />
          <div className="flex justify-between text-xs">
            <span className={cn(
              "font-medium",
              isOverBudget ? "text-destructive" : 
              isNearLimit ? "text-expense" : "text-muted-foreground"
            )}>
              {percentage.toFixed(1)}% used
            </span>
            <span className="text-muted-foreground">
              Budget: ${budget.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};