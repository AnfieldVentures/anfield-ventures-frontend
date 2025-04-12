
// Storage keys
const USER_KEY = 'anfield_ventures_user';
const USERS_KEY = 'anfield_ventures_users';
const THEME_KEY = 'anfield_ventures_theme';

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
  
  // Set default theme if not set
  if (!localStorage.getItem(THEME_KEY)) {
    localStorage.setItem(THEME_KEY, 'light');
  }
};
