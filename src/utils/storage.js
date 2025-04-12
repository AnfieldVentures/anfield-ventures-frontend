
// Storage keys
const USER_KEY = 'anfield_ventures_user';
const USERS_KEY = 'anfield_ventures_users';
const THEME_KEY = 'anfield_ventures_theme';
const INVESTMENTS_KEY = 'anfield_ventures_investments';
const TRANSACTIONS_KEY = 'anfield_ventures_transactions';

// Theme functions
export const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || 'light';
};

export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

// User and authentication functions
export const getCurrentUser = () => {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Store current user in local storage (exclude password for security)
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
};

export const registerUser = (name, email, password) => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: generateId(),
    name,
    email,
    password,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  // Add to users list
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const logoutUser = () => {
  localStorage.removeItem(USER_KEY);
};

const getUsers = () => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Investments functions
export const getUserInvestments = (userId) => {
  const investmentsJson = localStorage.getItem(INVESTMENTS_KEY);
  const investments = investmentsJson ? JSON.parse(investmentsJson) : [];
  return investments.filter(investment => investment.userId === userId);
};

export const createInvestment = (userId, plan, amount) => {
  const investmentsJson = localStorage.getItem(INVESTMENTS_KEY);
  const investments = investmentsJson ? JSON.parse(investmentsJson) : [];
  
  // Calculate return rate based on plan
  const returnRate = plan === 'daily' ? 1.2 : 7.5;
  
  const newInvestment = {
    id: generateId(),
    userId,
    plan,
    amount,
    returnRate,
    status: 'active',
    startDate: new Date().toISOString(),
    endDate: null
  };
  
  investments.push(newInvestment);
  localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(investments));
  
  // Create transaction entry for this investment
  createTransaction(userId, 'investment', amount, `New ${plan} investment`);
  
  return newInvestment;
};

// Transactions functions
export const getUserTransactions = (userId) => {
  const transactionsJson = localStorage.getItem(TRANSACTIONS_KEY);
  const transactions = transactionsJson ? JSON.parse(transactionsJson) : [];
  return transactions.filter(transaction => transaction.userId === userId);
};

export const createTransaction = (userId, type, amount, description) => {
  const transactionsJson = localStorage.getItem(TRANSACTIONS_KEY);
  const transactions = transactionsJson ? JSON.parse(transactionsJson) : [];
  
  const newTransaction = {
    id: generateId(),
    userId,
    type, // 'deposit', 'withdrawal', 'investment', 'return'
    amount,
    description,
    date: new Date().toISOString()
  };
  
  transactions.push(newTransaction);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  
  return newTransaction;
};

// Helper functions
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Sample data for the application
export const initializeLocalStorage = () => {
  // Only initialize if not already done
  if (!localStorage.getItem(USERS_KEY)) {
    const sampleUsers = [
      {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        createdAt: '2023-01-01T00:00:00.000Z'
      },
      {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        createdAt: '2023-01-02T00:00:00.000Z'
      }
    ];
    
    localStorage.setItem(USERS_KEY, JSON.stringify(sampleUsers));
  }
  
  // Initialize investments if not already done
  if (!localStorage.getItem(INVESTMENTS_KEY)) {
    const sampleInvestments = [
      {
        id: 'inv1',
        userId: 'user1',
        plan: 'daily',
        amount: 1000,
        returnRate: 1.2,
        status: 'active',
        startDate: '2023-03-15T00:00:00.000Z',
        endDate: null
      },
      {
        id: 'inv2',
        userId: 'user1',
        plan: 'weekly',
        amount: 5000,
        returnRate: 7.5,
        status: 'active',
        startDate: '2023-03-01T00:00:00.000Z',
        endDate: null
      }
    ];
    
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(sampleInvestments));
  }
  
  // Initialize transactions if not already done
  if (!localStorage.getItem(TRANSACTIONS_KEY)) {
    const sampleTransactions = [
      {
        id: 'trans1',
        userId: 'user1',
        type: 'deposit',
        amount: 10000,
        description: 'Initial deposit',
        date: '2023-03-01T00:00:00.000Z'
      },
      {
        id: 'trans2',
        userId: 'user1',
        type: 'investment',
        amount: 5000,
        description: 'Weekly investment plan',
        date: '2023-03-01T00:00:00.000Z'
      },
      {
        id: 'trans3',
        userId: 'user1',
        type: 'investment',
        amount: 1000,
        description: 'Daily investment plan',
        date: '2023-03-15T00:00:00.000Z'
      },
      {
        id: 'trans4',
        userId: 'user1',
        type: 'return',
        amount: 375,
        description: 'Weekly plan returns',
        date: '2023-03-08T00:00:00.000Z'
      },
      {
        id: 'trans5',
        userId: 'user1',
        type: 'return',
        amount: 84,
        description: 'Daily plan returns',
        date: '2023-03-22T00:00:00.000Z'
      }
    ];
    
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(sampleTransactions));
  }
  
  // Set default theme if not set
  if (!localStorage.getItem(THEME_KEY)) {
    localStorage.setItem(THEME_KEY, 'light');
  }
};

// Add TypeScript-like definitions for JavaScript
// This is just for documentation purposes now that we're using JavaScript
/*
export const Investment = {
  id: String,
  userId: String,
  plan: String, // 'daily' or 'weekly'
  amount: Number,
  returnRate: Number,
  status: String, // 'active' or 'completed'
  startDate: String, // ISO string
  endDate: String // ISO string or null
};

export const Transaction = {
  id: String,
  userId: String,
  type: String, // 'deposit', 'withdrawal', 'investment', 'return'
  amount: Number,
  description: String,
  date: String // ISO string
};
*/
