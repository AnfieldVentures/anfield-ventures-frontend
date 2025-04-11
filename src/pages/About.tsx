
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Anfield Ventures</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            A leading investment platform delivering consistent returns through innovative financial strategies
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Founded in 2020, Anfield Ventures was established with a clear mission: to make sophisticated investment strategies accessible to everyday investors.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                What began as a small team of financial experts has grown into a trusted platform serving thousands of investors worldwide. Our approach combines traditional investment wisdom with cutting-edge technology to deliver consistent returns regardless of market conditions.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Today, Anfield Ventures manages over $15 million in assets, with a track record of delivering on our promise of stable and attractive returns to our growing community of investors.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-anfield-primary to-anfield-secondary rounded-lg p-1">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4">
                      <p className="text-3xl font-bold text-anfield-primary dark:text-anfield-accent mb-2">5+</p>
                      <p className="text-gray-600 dark:text-gray-400">Years in business</p>
                    </div>
                    <div className="text-center p-4">
                      <p className="text-3xl font-bold text-anfield-primary dark:text-anfield-accent mb-2">13k+</p>
                      <p className="text-gray-600 dark:text-gray-400">Active investors</p>
                    </div>
                    <div className="text-center p-4">
                      <p className="text-3xl font-bold text-anfield-primary dark:text-anfield-accent mb-2">$15M+</p>
                      <p className="text-gray-600 dark:text-gray-400">Assets managed</p>
                    </div>
                    <div className="text-center p-4">
                      <p className="text-3xl font-bold text-anfield-primary dark:text-anfield-accent mb-2">95%</p>
                      <p className="text-gray-600 dark:text-gray-400">Client satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400">
              The principles that guide everything we do at Anfield Ventures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
              <div className="h-12 w-12 bg-anfield-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-anfield-primary dark:text-anfield-accent text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We operate with complete transparency and honesty in all our dealings. What we promise is what we deliver—no hidden fees, no surprises.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
              <div className="h-12 w-12 bg-anfield-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-anfield-primary dark:text-anfield-accent text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously explore and adopt cutting-edge investment strategies and technologies to stay ahead of market trends and maximize returns for our clients.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
              <div className="h-12 w-12 bg-anfield-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-anfield-primary dark:text-anfield-accent text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe everyone deserves access to quality investment opportunities, regardless of their financial background or expertise.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our straightforward process makes investing simple and rewarding
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 md:left-1/2 h-full w-0.5 bg-anfield-primary/20 transform -translate-x-1/2"></div>
              
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center mb-16 relative">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-right md:order-1 order-2">
                  <h3 className="text-xl font-bold mb-3">Create an Account</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sign up in just a few minutes. Our streamlined registration process gets you started quickly with minimal paperwork.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2">
                  <div className="w-10 h-10 bg-anfield-primary rounded-full flex items-center justify-center z-10">
                    <span className="text-white font-bold">1</span>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center mb-16 relative">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12 md:order-2 order-2">
                  <h3 className="text-xl font-bold mb-3">Choose Your Investment Plan</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select the plan that best fits your financial goals. Whether you prefer daily or weekly returns, we have options for every investor.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-start md:justify-center order-1">
                  <div className="w-10 h-10 bg-anfield-primary rounded-full flex items-center justify-center z-10">
                    <span className="text-white font-bold">2</span>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center mb-16 relative">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-right md:order-1 order-2">
                  <h3 className="text-xl font-bold mb-3">Fund Your Account</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Make a deposit using your preferred payment method. We offer multiple secure options to fund your investment.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-start md:justify-center order-1 md:order-2">
                  <div className="w-10 h-10 bg-anfield-primary rounded-full flex items-center justify-center z-10">
                    <span className="text-white font-bold">3</span>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center relative">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12 md:order-2 order-2">
                  <h3 className="text-xl font-bold mb-3">Collect Your Returns</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Watch your investment grow and withdraw your earnings at any time. Our platform features instant withdrawals for your convenience.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-start md:justify-center order-1">
                  <div className="w-10 h-10 bg-anfield-primary rounded-full flex items-center justify-center z-10">
                    <span className="text-white font-bold">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover what sets Anfield Ventures apart from traditional investment platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Consistent Returns</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our investment strategies are designed to deliver reliable returns regardless of market volatility.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Transparent Operations</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We provide complete visibility into our investment process, so you always know where your money is.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instant Withdrawals</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Access your funds whenever you need them with our efficient withdrawal system.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Professional Support</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our team of investment specialists is available 24/7 to address any questions or concerns you may have.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
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
                View Investment Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
