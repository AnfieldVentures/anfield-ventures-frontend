
import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../utils/storage.js';
import { useToast } from '../hooks/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email, password) => {
    try {
      const loggedInUser = loginUser(email, password);
      setUser(loggedInUser);
      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials",
      });
      throw error;
    }
  };
  
  const register = async (name, email, password) => {
    try {
      const newUser = registerUser(name, email, password);
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      // We don't return the user, just to match the Promise<void> type
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "Failed to create account",
      });
      throw error;
    }
  };
  
  const logout = () => {
    logoutUser();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isLoading,
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
