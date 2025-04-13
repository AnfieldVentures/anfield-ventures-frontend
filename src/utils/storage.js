
import { supabase } from '../integrations/supabase/client.js';

export const initializeLocalStorage = () => {
  // No longer needed as we're using Supabase for storage
  console.log("Using Supabase for data storage");
};

// Theme utility functions
export const getTheme = () => {
  const theme = localStorage.getItem('theme');
  return theme || 'light'; // Default to light if no theme is set
};

export const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
};

// Example query function for fetching user data
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};

// Example mutation function for updating user data
export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Investment functions
export const getUserInvestments = (userId) => {
  // For now, return mock data
  // In a real implementation, this would use Supabase
  return [
    {
      id: '1',
      userId: userId,
      plan: 'daily',
      amount: 1000,
      returnRate: 1.2,
      startDate: new Date().toISOString(),
      status: 'active'
    },
    {
      id: '2',
      userId: userId,
      plan: 'weekly',
      amount: 5000,
      returnRate: 7.5,
      startDate: new Date(Date.now() - 7*24*60*60*1000).toISOString(), // 1 week ago
      status: 'active'
    }
  ];
};

// Transaction functions
export const getUserTransactions = (userId) => {
  // For now, return mock data
  // In a real implementation, this would use Supabase
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  return [
    {
      id: '1',
      userId: userId,
      type: 'deposit',
      amount: 1000,
      status: 'completed',
      date: yesterday.toISOString(),
      description: 'Initial deposit for daily plan'
    },
    {
      id: '2',
      userId: userId,
      type: 'deposit',
      amount: 5000,
      status: 'completed',
      date: lastWeek.toISOString(),
      description: 'Initial deposit for weekly plan'
    },
    {
      id: '3',
      userId: userId,
      type: 'return',
      amount: 12,
      status: 'completed',
      date: today.toISOString(),
      description: 'Daily return on investment'
    },
    {
      id: '4',
      userId: userId,
      type: 'withdrawal',
      amount: 100,
      status: 'pending',
      date: today.toISOString(),
      description: 'Withdrawal request'
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
