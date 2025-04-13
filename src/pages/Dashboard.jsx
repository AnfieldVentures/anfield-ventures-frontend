
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserInvestments, getUserTransactions, getUserProfile } from '../utils/storage.js';
import { StatCard } from '../components/StatCard.jsx';
import { TransactionList } from '../components/TransactionList.jsx';
import { Wallet, TrendingUp, CreditCard, Copy, Check } from 'lucide-react';
import { supabase } from '../integrations/supabase/client.js';
import { Button } from "@/components/ui/button";
import { useToast } from '../hooks/use-toast.js';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const walletAddress = "bc1qqefp53svtcpayry7clxj0u85urp5qur5fz9uzs";
  
  // Function to copy wallet address to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard.",
      });
      
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy to clipboard.",
      });
    }
  };
  
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
            
            {/* Deposit Button with Wallet Address - Mobile Responsive */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Deposit Funds</h2>
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  To add funds to your account, send Bitcoin to the following address:
                </p>
                
                {/* Mobile responsive address display and copy button */}
                <div className="flex flex-col sm:flex-row w-full">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-t-md sm:rounded-l-md sm:rounded-tr-none w-full overflow-x-auto">
                    <code className="text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {walletAddress}
                    </code>
                  </div>
                  <Button 
                    className="w-full sm:w-auto rounded-b-md sm:rounded-l-none sm:rounded-r-md flex items-center justify-center" 
                    onClick={copyToClipboard}
                    size="sm"
                  >
                    {copied ? <Check className="mr-1" size={16} /> : <Copy className="mr-1" size={16} />}
                    <span>{copied ? "Copied" : "Copy Address"}</span>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Funds will appear in your account after network confirmation.
                </p>
              </div>
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
