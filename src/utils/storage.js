
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
export const getUserInvestments = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching investments:', error);
    // Return empty array as fallback
    return [];
  }
};

// Create a new investment
export const createInvestment = async (investmentData) => {
  try {
    const { data, error } = await supabase
      .from('investments')
      .insert(investmentData)
      .select();
      
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating investment:', error);
    throw error;
  }
};

// Transaction functions
export const getUserTransactions = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    // Return empty array as fallback
    return [];
  }
};

// Create a new transaction
export const createTransaction = async (transactionData) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transactionData)
      .select();
      
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

// Update account balance
export const updateAccountBalance = async (userId, newBalance) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ account_balance: newBalance })
      .eq('id', userId)
      .select();
      
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating account balance:', error);
    throw error;
  }
};
