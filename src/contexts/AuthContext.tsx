
import { createContext, useContext, useEffect, useState } from 'react';
import { User, getCurrentUser, loginUser, logoutUser, registerUser } from '../utils/storage';
import { useToast } from '../hooks/use-toast';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
  
  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = loginUser(email, password);
      setUser(loggedInUser);
      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials",
      });
      throw error;
    }
  };
  
  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      const newUser = registerUser(name, email, password);
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      // We don't return the user, just to match the Promise<void> type
    } catch (error: any) {
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
