import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { Logo } from '../ui/Logo.js';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQs', path: '/faq' },
  ];

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-ivory/95 backdrop-blur-md shadow-sm border-b border-luxury-taupe/20 py-3.5'
          : 'bg-luxury-ivory/90 backdrop-blur-sm border-b border-luxury-taupe/15 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center focus:outline-none" aria-label="VIDORA Events Home">
          <Logo variant="dark" size="md" subtitle="EVENTS &bull; SRI LANKA" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-9">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-sans text-xs tracking-wider uppercase transition-all duration-200 relative py-1 ${
                isLinkActive(link.path)
                  ? 'text-luxury-charcoal font-semibold'
                  : 'text-luxury-charcoal/70 hover:text-luxury-charcoal'
              }`}
            >
              {link.name}
              {isLinkActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-luxury-gold"></span>
              )}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              to="/admin"
              className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-luxury-gold hover:text-luxury-charcoal transition-colors font-medium"
              title="Admin Panel"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* Primary CTA and Hotline */}
        <div className="hidden md:flex items-center space-x-5">
          <a
            href="tel:+94771234567"
            className="flex items-center space-x-1.5 text-xs text-luxury-charcoal hover:text-luxury-gold transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-luxury-gold" />
            <span>+94 77 536 4603</span>
          </a>
          <Link
            to="/inquire"
            className="inline-flex items-center justify-center font-sans tracking-wider uppercase text-xs px-6 py-2.5 bg-luxury-charcoal text-luxury-ivory hover:bg-black transition-all duration-200 shadow-sm rounded-sm"
          >
            Plan Your Event
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-luxury-charcoal hover:text-luxury-gold focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-luxury-ivory border-b border-luxury-taupe/30 px-6 py-6 space-y-5 animate-fadeIn">
          <nav className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-serif tracking-wider uppercase transition-colors ${
                  isLinkActive(link.path) ? 'text-luxury-gold font-semibold' : 'text-luxury-charcoal'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                to="/admin"
                className="text-base font-serif tracking-wider uppercase text-luxury-gold flex items-center space-x-2 pt-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </nav>

          <div className="pt-4 border-t border-luxury-taupe/20 space-y-3">
            <a
              href="tel:+94771234567"
              className="flex items-center space-x-2 text-xs font-sans text-luxury-charcoal font-medium"
            >
              <Phone className="w-4 h-4 text-luxury-gold" />
              <span>Call / WhatsApp: +94 77 536 4603</span>
            </a>
            <Link
              to="/inquire"
              className="block w-full text-center font-sans tracking-wider uppercase text-xs px-6 py-3.5 bg-luxury-charcoal text-luxury-ivory rounded-sm"
            >
              Plan Your Event
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
