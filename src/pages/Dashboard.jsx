
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { supabase } from '../integrations/supabase/client.js';
import { useToast } from '../hooks/use-toast.js';
import { StatCard } from '../components/StatCard.jsx';
import { TransactionList } from '../components/TransactionList.jsx';
import { Wallet, TrendingUp, CreditCard, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const walletAddress = "bc1qqefp53svtcpayry7clxj0u85urp5qur5fz9uzs";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast({ title: "Address copied!", description: "Wallet address copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      toast({ variant: "destructive", title: "Copy failed", description: "Could not copy to clipboard." });
    }
  };

  const fetchUserData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const { data: investmentsData } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id);

      const { data: transactionsData } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (profileData) {
        setBalance(profileData.account_balance || 0);
      }

      setInvestments(investmentsData || []);
      setTransactions(transactionsData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        variant: "destructive",
        title: "Error loading data",
        description: "Could not load your dashboard data. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data only once when the component mounts and when user changes
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const calculateTotalInvestment = () => investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const calculateTotalReturns = () => transactions.filter(t => t.type === 'return').reduce((sum, t) => sum + Number(t.amount), 0);
  const calculateActiveInvestments = () => investments.filter(inv => inv.status === 'active').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Account Balance" value={`$${balance.toFixed(2)}`} icon={<Wallet />} />
          <StatCard title="Total Investment" value={`$${calculateTotalInvestment().toFixed(2)}`} icon={<TrendingUp />} />
          <StatCard title="Total Returns" value={`$${calculateTotalReturns().toFixed(2)}`} icon={<CreditCard />} />
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Button onClick={copyToClipboard} className="flex items-center gap-2">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy Wallet Address"}
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionList transactions={transactions} />
          {transactions.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No transactions found</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={fetchUserData} variant="outline" className="flex items-center gap-2">
            <Loader2 className={isLoading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
