import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Impact", href: "/impact" },
  { label: "Bulk Orders", href: "/bulk-orders" },
  { label: "Marketplace", href: "/marketplace" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-[#fff5ed]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-md font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link to="/" className="pt-2">
          <img src={logo} alt="logo" className="w-28 md:w-32 h-auto"/>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="p-2 hover:bg-accent rounded-full transition-colors relative" aria-label="Cart">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
          </Link>
          <Link to="/login" className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground border border-border text-sm font-medium hover:opacity-90 transition-opacity">
            Sign in
          </Link>
          <button
            className="md:hidden p-2 hover:bg-accent rounded-full transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-center bg-primary text-primary-foreground mt-2"
              >
                Sign in
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
