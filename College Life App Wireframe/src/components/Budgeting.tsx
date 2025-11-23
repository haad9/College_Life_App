import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Bus, BookOpen, Coffee, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface Expense {
  id: number;
  item: string;
  amount: number;
  category: string;
  date: string;
}

export function Budgeting() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, item: "Lunch at Cafeteria", amount: 12.5, category: "Food", date: "Nov 8" },
    { id: 2, item: "Bus Pass", amount: 45, category: "Transport", date: "Nov 5" },
    { id: 3, item: "Textbook - Physics", amount: 85, category: "Books", date: "Nov 3" },
    { id: 4, item: "Coffee", amount: 4.5, category: "Food", date: "Nov 8" },
    { id: 5, item: "Dinner", amount: 18, category: "Food", date: "Nov 7" },
    { id: 6, item: "Uber", amount: 15, category: "Transport", date: "Nov 6" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [transactionsOpen, setTransactionsOpen] = useState(true);
  
  const [newExpense, setNewExpense] = useState({
    item: "",
    amount: "",
    category: "Food",
  });

  const monthlyBudget = 800;
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = monthlyBudget - totalSpent;

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const handleAddExpense = () => {
    if (newExpense.item && newExpense.amount && newExpense.category) {
      const expense: Expense = {
        id: Date.now(),
        item: newExpense.item,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({ item: "", amount: "", category: "Food" });
      setIsOpen(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Food":
        return <Coffee className="w-5 h-5" />;
      case "Transport":
        return <Bus className="w-5 h-5" />;
      case "Books":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  // Prepare data for pie chart
  const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const COLORS = {
    Food: "#10b981",
    Transport: "#3b82f6",
    Books: "#f59e0b",
    Entertainment: "#8b5cf6",
    Other: "#6b7280",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-900 dark:to-emerald-900 text-white px-6 py-8">
        <h1 className="text-white mb-1">Budget Management</h1>
        <p className="text-green-100">Track your expenses and stay on budget</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Budget Overview */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <p className="text-gray-600 dark:text-gray-400">Monthly Budget</p>
              <p className="text-gray-900 dark:text-white">${monthlyBudget.toFixed(2)}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Spent: ${totalSpent.toFixed(2)}</span>
                <span>Remaining: ${remaining.toFixed(2)}</span>
              </div>
              <Progress value={(totalSpent / monthlyBudget) * 100} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">This Week</p>
                  <p className="text-gray-900 dark:text-white">${(totalSpent * 0.3).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Saved</p>
                  <p className="text-gray-900 dark:text-white">${remaining.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart and Summary */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Spending Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Pie Chart */}
              <div className="w-full md:w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || COLORS.Other} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Summary */}
              <div className="w-full md:w-1/2 space-y-3">
                <h3 className="text-gray-900 dark:text-white">Expense Summary</h3>
                {Object.entries(categoryTotals).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <span className="text-gray-900 dark:text-white">{category}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white">${amount.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-green-500">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${totalSpent.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Expense Button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="w-5 h-5 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="item" className="dark:text-gray-300">Item Description</Label>
                <Input
                  id="item"
                  placeholder="e.g., Lunch, Textbook, Bus fare"
                  value={newExpense.item}
                  onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="amount" className="dark:text-gray-300">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <Label htmlFor="category" className="dark:text-gray-300">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddExpense} className="w-full bg-green-600 hover:bg-green-700">
                Save Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Category Breakdown - Dropdown */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="dark:text-white">Spending by Category</CardTitle>
              {categoryOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {categoryOpen && (
            <CardContent className="space-y-3">
              {Object.entries(categoryTotals).map(([category, amount]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <span className="text-gray-900 dark:text-white">{category}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white">${amount.toFixed(2)}</span>
                  </div>
                  <Progress value={(amount / totalSpent) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Recent Transactions - Dropdown */}
        <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader 
            className="cursor-pointer"
            onClick={() => setTransactionsOpen(!transactionsOpen)}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="dark:text-white">Recent Transactions</CardTitle>
              {transactionsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </CardHeader>
          {transactionsOpen && (
            <CardContent className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{expense.item}</p>
                      <p className="text-gray-600 dark:text-gray-400">{expense.category} • {expense.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 dark:text-white">-${expense.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
