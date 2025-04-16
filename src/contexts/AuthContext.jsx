import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '../hooks/use-toast.js';
import { supabase } from '../integrations/supabase/client.js';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserProfile = async (userId) => {
    if (!userId || profile) return; // Prevent fetching if no userId or profile already set
    console.log("Fetching profile for user:", userId);

    const result = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    console.log("Full result from Supabase:", result);

    const { data, error } = result;

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      console.log("Profile fetched successfully:", data);
      setProfile(data);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log('Initializing authentication');
      setIsLoading(true);

      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        setIsLoading(false);
        return;
      }

      console.log('Session:', session);

      if (session?.user) {
        setUser(session.user);
        console.log('User set:', session.user);
        await fetchUserProfile(session.user.id); // Only fetch if session is ready
        console.log("Done fetching user profile")
      }

      setIsLoading(false);
      console.log('Auth loading set to false');
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        console.log('Auth state changed:', session);
        const user = session?.user;
        setUser(user);

        if (user) {
          console.log('User set on auth state change:', user);
          await fetchUserProfile(user.id); // Only fetch if user is set
        } else {
          setProfile(null);
          console.log('User logged out, profile set to null');
        }

        setIsLoading(false);
        console.log('Auth loading set to false on auth state change');
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const login = async (email, password) => {
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
      throw error;
    }
  };

  const register = async (name, email, password) => {
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
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
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
      isLoading,
      login,
      register,
      logout
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
