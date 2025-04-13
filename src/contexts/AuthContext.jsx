
import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '../hooks/use-toast.js';
import { supabase } from '../integrations/supabase/client.js';

// Create Auth Context
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Check active session and fetch user profile on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is already authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { user } = session;
          setUser(user);
          
          // Fetch user profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          setProfile(profile);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (session) {
        setUser(session.user);
        
        // Fetch updated profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        setProfile(profile);
      } else {
        setUser(null);
        setProfile(null);
      }
      
      setIsLoading(false);
    });
    
    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      return data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials",
      });
      throw error;
    }
  };
  
  // Register function with financial data initialization
  const register = async (name, email, password) => {
    try {
      // Register the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      // Initialize financial data
      if (data.user) {
        try {
          // Ensure profile exists with zero balance
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              name,
              email,
              account_balance: 0
            });

          if (profileError) {
            console.error('Error creating profile:', profileError);
          }
          
          // Add initial empty transaction (optional, for demo purposes)
          const { error: transactionError } = await supabase
            .from('transactions')
            .insert({
              user_id: data.user.id,
              type: 'deposit',
              amount: 0,
              status: 'completed',
              description: 'Account opened'
            });
            
          if (transactionError) {
            console.error('Error creating initial transaction:', transactionError);
          }
          
        } catch (initError) {
          console.error('Error initializing user data:', initError);
          // Don't block registration if initialization fails
        }
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please check your email for verification.",
      });
      
      return data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "Failed to create account",
      });
      throw error;
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "Something went wrong",
      });
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile,
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
