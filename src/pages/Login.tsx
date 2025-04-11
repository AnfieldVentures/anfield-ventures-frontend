
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "../hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const validateForm = () => {
    let tempErrors = {
      email: "",
      password: "",
    };
    let isValid = true;
    
    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        await login(email, password);
        navigate("/dashboard");
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message || "Invalid credentials",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your Anfield Ventures account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-anfield-primary hover:text-anfield-secondary dark:text-anfield-accent dark:hover:text-anfield-accent/80">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center">
                <p className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Demo credentials: </span>
                  <span className="text-anfield-primary dark:text-anfield-accent font-medium">
                    demo@anfieldventures.com / password123
                  </span>
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center w-full">
              Don't have an account?{" "}
              <Link to="/register" className="text-anfield-primary hover:text-anfield-secondary dark:text-anfield-accent dark:hover:text-anfield-accent/80 font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
