
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import { getUserInvestments, getUserTransactions } from '../utils/storage.js';
import { StatCard } from '../components/StatCard.jsx';
import { TransactionList } from '../components/TransactionList.jsx';
import { Wallet, TrendingUp, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    if (user) {
      const userInvestments = getUserInvestments(user.id);
      const userTransactions = getUserTransactions(user.id);
      
      setInvestments(userInvestments);
      setTransactions(userTransactions);
    }
  }, [user]);

  const calculateTotalInvestment = () => {
    return investments.reduce((total, inv) => total + inv.amount, 0);
  };

  const calculateTotalReturns = () => {
    return transactions
      .filter(t => t.type === 'return')
      .reduce((total, t) => total + t.amount, 0);
  };

  const calculateActiveInvestments = () => {
    return investments.filter(inv => inv.status === 'active').length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Invested" 
            value={`$${calculateTotalInvestment().toLocaleString()}`}
            description="Across all active plans"
            icon={<Wallet size={24} />}
          />
          
          <StatCard 
            title="Returns Earned" 
            value={`$${calculateTotalReturns().toLocaleString()}`}
            description="Total investment returns"
            icon={<TrendingUp size={24} />}
            trend="up"
            trendValue="+15% this month"
          />
          
          <StatCard 
            title="Active Investments" 
            value={calculateActiveInvestments()}
            description="Currently running plans"
            icon={<CreditCard size={24} />}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Recent Transactions</h2>
          <TransactionList transactions={transactions} limit={5} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
