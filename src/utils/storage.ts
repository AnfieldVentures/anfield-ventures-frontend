
// Types for our app
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Investment {
  id: string;
  userId: string;
  plan: 'daily' | 'weekly';
  amount: number;
  returnRate: number;
  startDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'return';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
}

// Local Storage Keys
const USERS_KEY = 'anfield_ventures_users';
const CURRENT_USER_KEY = 'anfield_ventures_current_user';
const INVESTMENTS_KEY = 'anfield_ventures_investments';
const TRANSACTIONS_KEY = 'anfield_ventures_transactions';
const THEME_KEY = 'anfield_ventures_theme';

// User Management
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const registerUser = (name: string, email: string, password: string): User => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(user => user.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password, // In a real app, you would hash this password
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  return newUser;
};

export const loginUser = (email: string, password: string): User => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

// Investment Management
export const getUserInvestments = (userId: string): Investment[] => {
  const investments = localStorage.getItem(INVESTMENTS_KEY);
  const allInvestments: Investment[] = investments ? JSON.parse(investments) : [];
  return allInvestments.filter(inv => inv.userId === userId);
};

// Transaction Management
export const getUserTransactions = (userId: string): Transaction[] => {
  const transactions = localStorage.getItem(TRANSACTIONS_KEY);
  const allTransactions: Transaction[] = transactions ? JSON.parse(transactions) : [];
  return allTransactions.filter(tx => tx.userId === userId).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Theme Management
export const getTheme = (): string => {
  return localStorage.getItem(THEME_KEY) || 'light';
};

export const setTheme = (theme: string): void => {
  localStorage.setItem(THEME_KEY, theme);
};

// Initialize with sample data if it doesn't exist
export const initializeLocalStorage = () => {
  // Check if we already have users
  if (getUsers().length === 0) {
    const sampleUser: User = {
      id: crypto.randomUUID(),
      name: 'Demo User',
      email: 'demo@anfieldventures.com',
      password: 'password123',
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(USERS_KEY, JSON.stringify([sampleUser]));
    
    // Add sample investments
    const sampleInvestments: Investment[] = [
      {
        id: crypto.randomUUID(),
        userId: sampleUser.id,
        plan: 'daily',
        amount: 1000,
        returnRate: 1.2, // 1.2% daily
        startDate: new Date().toISOString(),
        status: 'active'
      },
      {
        id: crypto.randomUUID(),
        userId: sampleUser.id,
        plan: 'weekly',
        amount: 5000,
        returnRate: 7.5, // 7.5% weekly
        startDate: new Date().toISOString(),
        status: 'active'
      }
    ];
    
    localStorage.setItem(INVESTMENTS_KEY, JSON.stringify(sampleInvestments));
    
    // Add sample transactions
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const sampleTransactions: Transaction[] = [
      {
        id: crypto.randomUUID(),
        userId: sampleUser.id,
        type: 'deposit',
        amount: 1000,
        status: 'completed',
        date: yesterday.toISOString(),
        description: 'Initial deposit for daily plan'
      },
      {
        id: crypto.randomUUID(),
        userId: sampleUser.id,
        type: 'deposit',
        amount: 5000,
        status: 'completed',
        date: lastWeek.toISOString(),
        description: 'Initial deposit for weekly plan'
      },
      {
        id: crypto.randomUUID(),
        userId: sampleUser.id,
        type: 'return',
        amount: 12,
        status: 'completed',
        date: today.toISOString(),
        description: 'Daily return on investment'
      },
      {
        id: crypto.randomUUID(),
        userId: sampleUser.id,
        type: 'withdrawal',
        amount: 100,
        status: 'pending',
        date: today.toISOString(),
        description: 'Withdrawal request'
      }
    ];
    
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(sampleTransactions));
  }
};
