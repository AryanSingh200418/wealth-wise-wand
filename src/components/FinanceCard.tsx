import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FinanceCardProps {
  title: string;
  amount: string;
  icon: LucideIcon;
  variant: "income" | "expense" | "savings" | "balance";
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const FinanceCard = ({ 
  title, 
  amount, 
  icon: Icon, 
  variant, 
  trend, 
  className 
}: FinanceCardProps) => {
  const variantStyles = {
    income: "bg-gradient-income shadow-income text-income-foreground",
    expense: "bg-gradient-expense shadow-expense text-expense-foreground", 
    savings: "bg-gradient-savings shadow-primary text-savings-foreground",
    balance: "bg-gradient-primary shadow-primary text-primary-foreground"
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border-0 transition-all duration-300 hover:scale-[1.02]",
      variantStyles[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 opacity-80" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{amount}</div>
        {trend && (
          <p className={cn(
            "text-xs opacity-80",
            trend.isPositive ? "text-emerald-100" : "text-red-100"
          )}>
            {trend.isPositive ? "+" : ""}{trend.value} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
};