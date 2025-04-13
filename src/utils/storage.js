
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
