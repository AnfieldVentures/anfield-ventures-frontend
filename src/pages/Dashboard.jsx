
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserInvestments, getUserTransactions, getUserProfile } from '../utils/storage.js';
import { StatCard } from '../components/StatCard.jsx';
import { TransactionList } from '../components/TransactionList.jsx';
import { Wallet, TrendingUp, CreditCard } from 'lucide-react';
import { supabase } from '../integrations/supabase/client.js';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  
  // Function to fetch all user data
  const fetchUserData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Get latest profile data for balance
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      // Fetch investments and transactions directly
      const { data: investmentsData } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id);
        
      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      // Update state with fetched data
      if (profileData) {
        setBalance(profileData.account_balance || 0);
      }
      
      setInvestments(investmentsData || []);
      setTransactions(transactionsData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Set up real-time subscription for profile updates
  useEffect(() => {
    if (!user) return;
    
    // Initial data fetch
    fetchUserData();
    
    // Set up real-time listeners for database changes
    const profileChannel = supabase
      .channel('profile-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` }, 
        () => {
          console.log('Profile changed, refreshing data...');
          fetchUserData();
        }
      )
      .subscribe();
      
    const transactionsChannel = supabase
      .channel('transactions-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` }, 
        () => {
          console.log('Transactions changed, refreshing data...');
          fetchUserData();
        }
      )
      .subscribe();
      
    const investmentsChannel = supabase
      .channel('investments-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'investments', filter: `user_id=eq.${user.id}` }, 
        () => {
          console.log('Investments changed, refreshing data...');
          fetchUserData();
        }
      )
      .subscribe();
    
    // Clean up subscriptions
    return () => {
      supabase.removeChannel(profileChannel);
      supabase.removeChannel(transactionsChannel);
      supabase.removeChannel(investmentsChannel);
    };
  }, [user]);

  const calculateTotalInvestment = () => {
    return investments.reduce((total, inv) => total + Number(inv.amount), 0);
  };

  const calculateTotalReturns = () => {
    return transactions
      .filter(t => t.type === 'return')
      .reduce((total, t) => total + Number(t.amount), 0);
  };

  const calculateActiveInvestments = () => {
    return investments.filter(inv => inv.status === 'active').length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-anfield-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard 
                title="Total Balance" 
                value={`$${balance.toLocaleString()}`}
                description="Your available balance"
                icon={<Wallet size={24} />}
              />
              
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
              {transactions.length > 0 ? (
                <TransactionList transactions={transactions} limit={5} />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 py-4 text-center">No transactions yet.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
