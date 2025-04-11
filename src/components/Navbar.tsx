
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Plans", path: "/plans" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-10 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient">Anfield Ventures</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? "text-anfield-primary dark:text-anfield-accent font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-anfield-primary dark:hover:text-anfield-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="ml-4">
                <ThemeToggle />
              </div>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link to="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                  <Button onClick={logout} variant="ghost">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="default">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "text-anfield-primary dark:text-anfield-accent font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
