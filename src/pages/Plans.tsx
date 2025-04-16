import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Plans = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Header Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Plans</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Choose from our carefully designed investment plans tailored to help you achieve your financial goals
          </p>
        </div>
      </section>
      
      {/* Plans Comparison */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Plans</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Compare our investment options to find the perfect fit for your goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
              <div className="p-6 bg-anfield-primary text-white">
                <h3 className="text-xl font-bold mb-2">Starter Plan</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">10%</span>
                  <span className="ml-1 opacity-90">Daily</span>
                </div>
                <p className="opacity-90 mt-2">For new investors</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Min Investment</span>
                    <span className="font-bold">$100</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Max Investment</span>
                    <span className="font-bold">$1,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Duration</span>
                    <span className="font-bold">30 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Return</span>
                    <span className="font-bold text-green-600 dark:text-green-400">~300%</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Daily payouts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Instant withdrawals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>24/7 support</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <X className="h-5 w-5 mr-2" />
                    <span>Referral bonus</span>
                  </div>
                </div>
                
                <Link to="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
            
            {/* Professional Plan - Highlighted */}
            <div className="bg-white dark:bg-gray-800 border-2 border-anfield-accent rounded-xl shadow-xl overflow-hidden transform md:scale-105 relative">
              <div className="absolute top-0 right-0 bg-anfield-accent text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg">
                Most Popular
              </div>
              <div className="p-6 bg-anfield-secondary text-white">
                <h3 className="text-xl font-bold mb-2">Professional Plan</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">25%</span>
                  <span className="ml-1 opacity-90">Weekly</span>
                </div>
                <p className="opacity-90 mt-2">For serious investors</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Min Investment</span>
                    <span className="font-bold">$500</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Max Investment</span>
                    <span className="font-bold">$10,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Duration</span>
                    <span className="font-bold">12 Weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Return</span>
                    <span className="font-bold text-green-600 dark:text-green-400">~300%</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Weekly payouts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Instant withdrawals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>24/7 priority support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>5% referral bonus</span>
                  </div>
                </div>
                
                <Link to="/register">
                  <Button className="w-full" variant="default">Get Started</Button>
                </Link>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
              <div className="p-6 bg-anfield-primary text-white">
                <h3 className="text-xl font-bold mb-2">Enterprise Plan</h3>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">15%</span>
                  <span className="ml-1 opacity-90">Daily</span>
                </div>
                <p className="opacity-90 mt-2">For high-volume investors</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Min Investment</span>
                    <span className="font-bold">$5,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Max Investment</span>
                    <span className="font-bold">$50,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Duration</span>
                    <span className="font-bold">30 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Return</span>
                    <span className="font-bold text-green-600 dark:text-green-400">~450%</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Daily payouts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Instant withdrawals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>10% referral bonus</span>
                  </div>
                </div>
                
                <Link to="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Returns Calculator */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Calculate Your Returns</h2>
            <p className="text-gray-600 dark:text-gray-400">
              See how much you could earn with our investment plans
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6">Starter Plan (Daily 10%)</h3>
                <table className="w-full">
                  <thead className="border-b dark:border-gray-700">
                    <tr>
                      <th className="text-left py-2">Investment</th>
                      <th className="text-left py-2">Monthly Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2">$100</td>
                      <td className="py-2 text-green-600 dark:text-green-400">$300.00</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2">$500</td>
                      <td className="py-2 text-green-600 dark:text-green-400">$1,500.00</td>
                    </tr>
                    <tr>
                      <td className="py-2">$1,000</td>
                      <td className="py-2 text-green-600 dark:text-green-400">$3,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Professional Plan (Weekly 25%)</h3>
                <table className="w-full">
                  <thead className="border-b dark:border-gray-700">
                    <tr>
                      <th className="text-left py-2">Investment</th>
                      <th className="text-left py-2">12-Week Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2">$500</td>
                      <td className="py-2 text-green-600 dark:text-green-400">$1,500.00</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2">$1,000</td>
                      <td className="py-2 text-green-600 dark:text-green-400">$3,000.00</td>
                    </tr>
                    <tr>
                      <td className="py-2">$5,000</td>
                      <td className="py-2 text-green-600 dark:text-green-400">$15,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/register">
                <Button>Start Earning Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find answers to common questions about our investment plans
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I get started with investing?</AccordionTrigger>
                <AccordionContent>
                  Getting started is simple. First, create an account by providing your basic information. Once registered, choose an investment plan that matches your goals, fund your account, and your investment will start generating returns immediately.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What is the minimum investment amount?</AccordionTrigger>
                <AccordionContent>
                  Our Starter Plan allows you to begin with as little as $100. For the Professional Plan, the minimum investment is $500, and the Enterprise Plan requires a minimum of $5,000.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How often can I withdraw my earnings?</AccordionTrigger>
                <AccordionContent>
                  You can withdraw your earnings at any time. Our platform features instant withdrawal processing, ensuring you have quick access to your funds whenever needed.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Is there a lock-up period for my investments?</AccordionTrigger>
                <AccordionContent>
                  While our plans have specified durations (30 days for daily plans and 12 weeks for weekly plans), you can withdraw your principal at any time, subject to an early withdrawal fee. Your earned profits remain yours to withdraw without penalties.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept a variety of payment methods including credit/debit cards, bank transfers, and major cryptocurrencies like Bitcoin and Ethereum. All transactions are processed securely.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Do you have a referral program?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a generous referral program. When someone you refer invests, you'll receive a commission based on your investment plan: 5% for Professional Plan investors and 10% for Enterprise Plan investors.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Growing Your Wealth Today</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of satisfied investors who are already benefiting from our innovative investment plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-anfield-primary hover:bg-gray-100 font-semibold">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Plans;
