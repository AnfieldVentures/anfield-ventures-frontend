import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '../hooks/use-toast.js';
import { supabase } from '../integrations/supabase/client.js';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false); // Separate loading state for profile
  const { toast } = useToast();

  // Improved fetchUserProfile function with better error handling and loading state management
  const fetchUserProfile = async (userId) => {
    if (!userId) return;
    
    console.log("Fetching profile for user:", userId);
    setIsProfileLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          variant: "destructive",
          title: "Error fetching profile",
          description: error.message || "Could not load your profile data.",
        });
        // Don't set profile to null here, keep any existing profile
      } else if (data) {
        console.log("Profile fetched successfully:", data);
        setProfile(data);
      } else {
        console.warn("No profile found for user:", userId);
        setProfile(null);
      }
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
    } finally {
      setIsProfileLoading(false);
      // Always ensure we set loading to false even if there's an error
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true; // Track if component is mounted
    
    const setupAuth = async () => {
      try {
        setIsLoading(true);
        console.log('Setting up authentication');
        
        // First set up the auth state change listener to catch any future changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log('Auth state changed:', event, session ? 'session exists' : 'no session');
            
            if (!mounted) return;
            
            if (session?.user) {
              setUser(session.user);
              // Use setTimeout to avoid potential deadlock with Supabase auth callbacks
              setTimeout(() => {
                if (mounted) fetchUserProfile(session.user.id);
              }, 0);
            } else {
              setUser(null);
              setProfile(null);
              setIsLoading(false);
            }
          }
        );
        
        // Then check for an existing session
        const { data: sessionData, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) setIsLoading(false);
          return;
        }
        
        const session = sessionData?.session;
        console.log('Initial session check:', session ? 'session found' : 'no session found');
        
        if (session?.user && mounted) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else if (mounted) {
          setIsLoading(false);
        }
        
        return subscription;
      } catch (err) {
        console.error('Unexpected error during auth setup:', err);
        if (mounted) setIsLoading(false);
      }
    };

    const subscription = setupAuth();
    
    // Cleanup function
    return () => {
      mounted = false;
      subscription.then(sub => sub?.unsubscribe());
    };
  }, []);

  // Rest of your auth methods with improved error handling
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      toast({ title: "Login successful", description: "Welcome back!" });
      return data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials",
      });
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) throw error;

      if (data.user) {
        const userId = data.user.id;

        const { error: profileError } = await supabase.from('profiles').upsert({
          id: userId,
          name,
          email,
          account_balance: 0,
        });
        if (profileError) console.error('Error creating profile:', profileError);

        const { error: transactionError } = await supabase.from('transactions').insert({
          user_id: userId,
          type: 'deposit',
          amount: 0,
          status: 'completed',
          description: 'Account opened',
        });
        if (transactionError) console.error('Error creating initial transaction:', transactionError);
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
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      toast({ title: "Logged out", description: "You have been successfully logged out." });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "Something went wrong",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isAuthenticated: !!user,
      isLoading: isLoading || isProfileLoading,
      login,
      register,
      logout,
      refetchProfile: () => user && fetchUserProfile(user.id)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
