
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { getUserInvestments, getUserTransactions } from "../utils/storage";
import { StatCard } from "../components/StatCard";
import { TransactionList } from "../components/TransactionList";
import { InvestmentCard } from "../components/InvestmentCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  Wallet,
  TrendingUp,
  DollarSign,
  Clock,
  PiggyBank,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  
  useEffect(() => {
    if (user) {
      // Load investments and transactions from localStorage
      const userInvestments = getUserInvestments(user.id);
      const userTransactions = getUserTransactions(user.id);
      setInvestments(userInvestments);
      setTransactions(userTransactions);
      
      // Calculate balances and profits (this would come from an API in a real app)
      let balance = 0;
      let profit = 0;
      
      // Calculate profit based on dummy data
      userInvestments.forEach(investment => {
        balance += investment.amount;
        
        const startDate = new Date(investment.startDate);
        const currentDate = new Date();
        const diffTime = currentDate.getTime() - startDate.getTime();
        
        if (investment.plan === 'daily') {
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          profit += investment.amount * (investment.returnRate / 100) * diffDays;
        } else {
          const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
          profit += investment.amount * (investment.returnRate / 100) * diffWeeks;
        }
      });
      
      setTotalBalance(balance + profit);
      setTotalProfit(profit);
    }
  }, [user]);
  
  // Data for the pie chart
  const portfolioData = [
    { name: 'Daily Plans', value: investments.filter(i => i.plan === 'daily').reduce((acc, curr) => acc + curr.amount, 0) },
    { name: 'Weekly Plans', value: investments.filter(i => i.plan === 'weekly').reduce((acc, curr) => acc + curr.amount, 0) },
  ];
  const COLORS = ['#4776E6', '#3A1C71'];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {user?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your investments and track your returns
            </p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Balance"
              value={`$${totalBalance.toFixed(2)}`}
              description="Your current portfolio value"
              icon={<Wallet className="h-6 w-6" />}
              trend="up"
              trendValue="+3.2% from last week"
            />
            
            <StatCard
              title="Total Profit"
              value={`$${totalProfit.toFixed(2)}`}
              description="Total returns earned"
              icon={<TrendingUp className="h-6 w-6" />}
              trend="up"
              trendValue="+2.5% from last week"
            />
            
            <StatCard
              title="Active Investments"
              value={investments.filter(i => i.status === 'active').length}
              description="Across all investment plans"
              icon={<PiggyBank className="h-6 w-6" />}
            />
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Portfolio Overview */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Portfolio Overview</CardTitle>
                  <CardDescription>Detailed view of your current investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="col-span-1 flex flex-col justify-center">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={portfolioData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label
                          >
                            {portfolioData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="col-span-2">
                      <h4 className="text-lg font-semibold mb-4">Active Investments</h4>
                      <div className="space-y-4">
                        {investments.length > 0 ? (
                          investments.slice(0, 2).map((investment) => (
                            <div key={investment.id} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              <div>
                                <p className="font-medium capitalize">{investment.plan} Plan</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  ${investment.amount} • {investment.returnRate}% {investment.plan === 'daily' ? 'daily' : 'weekly'}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to="/investments">
                                  View <ArrowUpRight className="h-4 w-4 ml-1" />
                                </Link>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400">No active investments</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/investments">View All Investments</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionList transactions={transactions} limit={5} />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/transactions">View All Transactions</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Side Panel */}
            <div className="space-y-8">
              {/* Investment Plans */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Plans</CardTitle>
                  <CardDescription>Choose a plan to invest in</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="daily">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    </TabsList>
                    <TabsContent value="daily">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Daily Returns</p>
                            <p className="text-2xl font-bold text-anfield-primary dark:text-anfield-accent">10% - 15%</p>
                          </div>
                          <DollarSign className="h-10 w-10 text-anfield-primary dark:text-anfield-accent opacity-80" />
                        </div>
                        <div className="text-sm space-y-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span>30-Day Investment Term</span>
                          </div>
                          <div className="flex items-center">
                            <Wallet className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Min Investment: $100</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Total Return: ~300%</span>
                          </div>
                        </div>
                        <Button className="w-full">Invest Now</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="weekly">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">Weekly Returns</p>
                            <p className="text-2xl font-bold text-anfield-secondary dark:text-anfield-secondary">25% - 30%</p>
                          </div>
                          <DollarSign className="h-10 w-10 text-anfield-secondary opacity-80" />
                        </div>
                        <div className="text-sm space-y-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span>12-Week Investment Term</span>
                          </div>
                          <div className="flex items-center">
                            <Wallet className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Min Investment: $500</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Total Return: ~300%</span>
                          </div>
                        </div>
                        <Button className="w-full">Invest Now</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Current Investments */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Investments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {investments.length > 0 ? (
                    investments.map((investment) => (
                      <InvestmentCard key={investment.id} investment={investment} />
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You don't have any active investments yet
                      </p>
                      <Button>Start Investing</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
