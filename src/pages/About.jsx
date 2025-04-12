
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { 
  Shield, 
  TrendingUp, 
  Users,
  Clock,
  Rocket,
  Award
} from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-anfield-primary to-anfield-secondary text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Anfield Ventures</h1>
            <p className="text-lg opacity-90 mb-8">
              Our mission is to make smart investing accessible to everyone. Learn more about our story, our team, and our vision.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Founded in 2020, Anfield Ventures was born from a vision to create a platform that democratizes access to high-yield investment opportunities typically reserved for institutional investors.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our founders, with over 30 years of combined experience in financial markets, identified a gap in the market: everyday investors were seeking better returns than traditional savings accounts but lacked access to sophisticated investment strategies.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Today, we serve thousands of investors globally, providing them with transparent, accessible, and profitable investment options.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">2020</h3>
                  <p className="text-gray-600 dark:text-gray-400">Anfield Ventures founded with a focus on accessibility</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">2021</h3>
                  <p className="text-gray-600 dark:text-gray-400">Reached first 1,000 investors milestone</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">2022</h3>
                  <p className="text-gray-600 dark:text-gray-400">Expanded service to include weekly return plans</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">2023</h3>
                  <p className="text-gray-600 dark:text-gray-400">Crossed $10M in total investments</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">2024</h3>
                  <p className="text-gray-600 dark:text-gray-400">Launched new platform with enhanced features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400">
              The principles that guide everything we do at Anfield Ventures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-anfield-primary/10 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Security & Trust</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We prioritize the security of your investments above all else, employing state-of-the-art measures to protect your assets.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-anfield-primary/10 rounded-lg mb-4">
                <TrendingUp className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're dedicated to consistently delivering above-market returns for our investors through strategic investments.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center bg-anfield-primary/10 rounded-lg mb-4">
                <Users className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe everyone deserves access to high-quality investment opportunities, regardless of their wealth or background.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400">
              The experts behind Anfield Ventures' success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Michael Thompson</h3>
                <p className="text-anfield-primary dark:text-anfield-accent mb-4">CEO & Founder</p>
                <p className="text-gray-600 dark:text-gray-400">
                  With 15+ years in fintech and investment banking, Michael leads our strategic vision with a focus on innovation.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sarah Chen</h3>
                <p className="text-anfield-primary dark:text-anfield-accent mb-4">Chief Investment Officer</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Sarah's expertise in portfolio management and risk assessment ensures our investment strategies deliver consistent returns.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">David Rodriguez</h3>
                <p className="text-anfield-primary dark:text-anfield-accent mb-4">Head of Technology</p>
                <p className="text-gray-600 dark:text-gray-400">
                  David oversees our platform development, ensuring a secure, seamless experience for all our investors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Anfield Ventures?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We stand out from traditional investment platforms in several key ways.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-anfield-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Rapid Returns</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Unlike traditional investments that take years to mature, our plans offer daily and weekly returns.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-anfield-primary/10 rounded-lg">
                <Rocket className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Low Entry Barrier</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start with as little as $100, making quality investments accessible to everyone.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-anfield-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced encryption and monitoring systems protect your investments 24/7.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-anfield-primary/10 rounded-lg">
                <Award className="h-6 w-6 text-anfield-primary dark:text-anfield-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Management</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team of financial experts carefully manages each investment portfolio for optimal returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-anfield-primary to-anfield-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Start your investment journey with Anfield Ventures today and experience the difference of our expertly managed plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-anfield-primary hover:bg-gray-100 font-semibold">
                Create Account
              </Button>
            </Link>
            <Link to="/plans">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Plans
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
