import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, TrendingDown, PieChart } from "lucide-react";

const expenseData = [
  { name: "Housing", value: 25000, percentage: 55.6, color: "bg-blue-500" },
  { name: "Food", value: 8500, percentage: 18.9, color: "bg-green-500" },
  { name: "Transportation", value: 4500, percentage: 10.0, color: "bg-yellow-500" },
  { name: "Entertainment", value: 2800, percentage: 6.2, color: "bg-red-500" },
  { name: "Shopping", value: 3200, percentage: 7.1, color: "bg-purple-500" },
  { name: "Healthcare", value: 1500, percentage: 3.3, color: "bg-cyan-500" },
];

const monthlyData = [
  { month: "Jan", income: 95000, expenses: 45500, savings: 49500 },
  { month: "Feb", income: 87000, expenses: 42000, savings: 45000 },
  { month: "Mar", income: 92000, expenses: 48000, savings: 44000 },
  { month: "Apr", income: 98000, expenses: 51000, savings: 47000 },
  { month: "May", income: 105000, expenses: 49500, savings: 55500 },
  { month: "Jun", income: 88000, expenses: 45500, savings: 42500 },
];

export const Analytics = () => {
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const incomeChange = ((currentMonth.income - previousMonth.income) / previousMonth.income * 100).toFixed(1);
  const expenseChange = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1);
  const savingsRate = (currentMonth.savings / currentMonth.income * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Visualize your financial patterns and trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-income">₹{currentMonth.income.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {incomeChange > "0" ? "+" : ""}{incomeChange}% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-expense">₹{currentMonth.expenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {expenseChange > "0" ? "+" : ""}{expenseChange}% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Savings Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-savings">{savingsRate}%</div>
              <p className="text-xs text-muted-foreground">₹{currentMonth.savings.toLocaleString()} saved</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Largest Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Housing</div>
              <p className="text-xs text-muted-foreground">₹25,000 (55.6% of expenses)</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Breakdown */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Expense Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {expenseData.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded ${category.color}`}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">₹{category.value.toLocaleString()}</span>
                      <div className="text-xs text-muted-foreground">{category.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Monthly Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyData.slice(-3).map((month) => (
                <div key={month.month} className="space-y-2">
                  <h4 className="font-medium">{month.month} 2024</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 rounded bg-income-light">
                      <div className="text-xs text-income-foreground/80">Income</div>
                      <div className="font-semibold text-income">₹{month.income.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-2 rounded bg-expense-light">
                      <div className="text-xs text-expense-foreground/80">Expenses</div>
                      <div className="font-semibold text-expense">₹{month.expenses.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-2 rounded bg-savings-light">
                      <div className="text-xs text-savings-foreground/80">Savings</div>
                      <div className="font-semibold text-savings">₹{month.savings.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Financial Health Score */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Financial Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-savings mb-2">85</div>
                <h3 className="font-semibold mb-2">Overall Score</h3>
                <Progress value={85} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">Excellent financial health</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-income mb-2">92</div>
                <h3 className="font-semibold mb-2">Savings Rate</h3>
                <Progress value={92} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">Great savings habits</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-expense mb-2">78</div>
                <h3 className="font-semibold mb-2">Budget Control</h3>
                <Progress value={78} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">Good spending control</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-income">
                <TrendingUp className="h-5 w-5" />
                <span>Positive Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-income"></div>
                <span className="text-sm">Income increased by {incomeChange}% this month</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-savings"></div>
                <span className="text-sm">Savings rate above 50%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-income"></div>
                <span className="text-sm">Consistent income growth over 3 months</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-expense">
                <TrendingDown className="h-5 w-5" />
                <span>Areas to Improve</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-expense"></div>
                <span className="text-sm">Entertainment spending exceeded budget</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-expense"></div>
                <span className="text-sm">Food expenses increased by 15%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-expense"></div>
                <span className="text-sm">Consider reviewing transportation costs</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};