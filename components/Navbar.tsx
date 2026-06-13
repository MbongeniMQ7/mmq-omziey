import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

export default function Navbar({ activeSection, onNavClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Programs', id: 'programs' },
    { name: 'Trainers', id: 'trainers' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar-container"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-primary/90 backdrop-blur-md border-customBorder py-4 shadow-sm'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          id="nav-logo"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          className="text-3xl font-display text-accent tracking-wider font-extrabold hover:opacity-90 transition-opacity"
        >
          FLEXI
        </a>

        {/* Desktop Nav Links */}
        <div id="desktop-nav-links" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              id={`nav-link-${link.id}`}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className={`text-sm tracking-wider uppercase font-medium transition-all duration-200 hover:text-accent ${
                activeSection === link.id ? 'text-accent' : 'text-textPrimary/80'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            id="nav-cta-desktop"
            onClick={() => handleLinkClick('contact')}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-white text-sm font-semibold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            Start Today
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-trigger"
          className="md:hidden text-textPrimary hover:text-accent p-1 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer-backdrop"
          className="md:hidden fixed inset-0 top-[73px] bg-primary/95 backdrop-blur-lg z-40 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-drawer-container"
        className={`md:hidden fixed top-[73px] right-0 left-0 bg-surface border-b border-customBorder p-8 z-50 transform transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              id={`mobile-nav-link-${link.id}`}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className={`text-xl tracking-wider uppercase font-display border-b border-customBorder pb-2 transition-colors ${
                activeSection === link.id ? 'text-accent' : 'text-textPrimary/80'
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            id="nav-cta-mobile"
            onClick={() => handleLinkClick('contact')}
            className="w-full py-4 bg-accent text-white text-center font-bold tracking-wider uppercase rounded-full transition-all duration-200 hover:bg-accent/95 shadow-lg shadow-accent/15"
          >
            Start Today
          </button>
        </div>
      </div>
    </nav>
  );
}
