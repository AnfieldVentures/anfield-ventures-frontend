import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { 
  CheckCircle, 
  Shield, 
  TrendingUp, 
  Clock, 
  Gift, 
  CreditCard, 
  ArrowRight 
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 sm:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Earn Daily & Weekly Returns With Smart Investments
              </h1>
              <p className="text-lg opacity-90 max-w-md">
                Join thousands of investors leveraging our expertise to grow their wealth consistently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-anfield-primary hover:bg-gray-100 font-semibold">
                    Get Started
                  </Button>
                </Link>
                <Link to="/plans">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="glass-card p-8 animate-float">
                <h3 className="text-xl font-bold mb-4">Investment Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Daily Return</span>
                    <span className="font-bold">10% - 15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weekly Return</span>
                    <span className="font-bold">25% - 30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Min Investment</span>
                    <span className="font-bold">$100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Withdrawal</span>
                    <span className="font-bold">Instant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">$15M+</p>
              <p className="text-gray-600 dark:text-gray-400">Total Invested</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">13k+</p>
              <p className="text-gray-600 dark:text-gray-400">Active Investors</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">95%</p>
              <p className="text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">5 Years</p>
              <p className="text-gray-600 dark:text-gray-400">In Operation</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - About Section */}
      <section id="about-section" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Anfield Ventures?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our platform offers the best investment experience with features designed to maximize your returns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-anfield-primary/10 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your investments are protected by our state-of-the-art security protocols and insurance policies.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-anfield-primary/10 rounded-lg mb-4">
                <TrendingUp className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Returns</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our strategic investment approach consistently delivers above-market returns for our investors.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-anfield-primary/10 rounded-lg mb-4">
                <Clock className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Withdrawals</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your earnings whenever you need them with our quick and hassle-free withdrawal system.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Investment Plans Preview - Plans Section */}
      <section id="plans-section" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Investment Plans</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose the plan that best suits your investment goals and risk tolerance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-anfield-primary text-white">
                <h3 className="text-xl font-bold mb-2">Daily Returns</h3>
                <p className="opacity-90">Perfect for short-term growth</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-3xl font-bold mb-2">10% - 15%</p>
                  <p className="text-gray-600 dark:text-gray-400">Daily Return</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Minimum Investment: $100</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Daily Payouts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>30-Day Term</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Instant Withdrawals</span>
                  </div>
                </div>
                <Link to="/register">
                  <Button className="w-full">Invest Now</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-anfield-secondary text-white">
                <h3 className="text-xl font-bold mb-2">Weekly Returns</h3>
                <p className="opacity-90">Ideal for long-term stability</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-3xl font-bold mb-2">25% - 30%</p>
                  <p className="text-gray-600 dark:text-gray-400">Weekly Return</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Minimum Investment: $500</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Weekly Payouts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>12-Week Term</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Higher Total Returns</span>
                  </div>
                </div>
                <Link to="/register">
                  <Button className="w-full">Invest Now</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/plans">
              <Button 
                variant="outline" 
                className="flex items-center mx-auto"
              >
                <span>View All Plans</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Investors Say</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Hear from real people who have experienced the benefits of investing with Anfield Ventures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "I've been investing with Anfield Ventures for over a year now, and the returns have been consistently impressive. The platform is easy to use, and withdrawals are truly instant."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-anfield-primary/20 flex items-center justify-center">
                  <span className="text-anfield-primary font-semibold">JD</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">James Brown</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Investor since 2022</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "The weekly returns plan has been a game-changer for my personal finances. I started small, but the results were so good that I've significantly increased my investment."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-anfield-primary/20 flex items-center justify-center">
                  <span className="text-anfield-primary font-semibold">SJ</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Linda Smith</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Investor since 2023</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "What I appreciate most about Anfield Ventures is their transparency and customer service. They're always responsive, and everything is exactly as advertised."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-anfield-primary/20 flex items-center justify-center">
                  <span className="text-anfield-primary font-semibold">RM</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">James Rodriguez</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Investor since 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Growing Your Wealth?</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of satisfied investors who are already benefiting from our innovative investment plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-anfield-primary hover:bg-gray-100 font-semibold">
                Create Account
              </Button>
            </Link>
            <Link to="/plans">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
