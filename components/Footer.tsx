import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavClick('hero');
  };

  return (
    <footer id="footer-section" className="bg-primary border-t border-customBorder py-16 text-left select-none relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-customBorder items-center">
          
          {/* Column 1: Brand details */}
          <div className="text-center md:text-left">
            <a
              id="footer-logo"
              href="#hero"
              onClick={handleScrollToTop}
              className="text-3xl font-display font-extrabold text-accent tracking-wider hover:opacity-90 transition-opacity uppercase inline-block"
            >
              FLEXI
            </a>
            <p className="text-xs text-textMuted font-sans max-w-xs mt-3 leading-relaxed mx-auto md:mx-0">
              High-converting physical programming built around genuine biometrical indicators and cellular durability.
            </p>
          </div>

          {/* Column 2: Navigation map links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { label: 'About', id: 'about' },
              { label: 'Programs', id: 'programs' },
              { label: 'Coaches', id: 'trainers' },
              { label: 'Success Cases', id: 'testimonials' },
              { label: 'Contact', id: 'contact' }
            ].map((link) => (
              <a
                key={link.id}
                id={`footer-link-${link.id}`}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(link.id);
                }}
                className="text-textMuted hover:text-accent font-sans transition-colors uppercase tracking-wider text-xs font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3: Social connectors */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              id="footer-social-ig"
              href="https://www.instagram.com/omziey/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-customBorder bg-white shadow-sm flex items-center justify-center text-textMuted hover:text-accent hover:border-accent/40 transition-all hover:scale-105"
              aria-label="Instagram handle"
            >
              {/* Custom SVG Instagram */}
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a
              id="footer-social-yt"
              href="https://www.youtube.com/@FlexiBaby"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-customBorder bg-white shadow-sm flex items-center justify-center text-textMuted hover:text-accent hover:border-accent/40 transition-all hover:scale-105"
              aria-label="YouTube channel"
            >
              {/* Custom SVG Youtube */}
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>

            {/* Custom raw SVG TikTok for premium look */}
            <a
              id="footer-social-tt"
              href="https://www.tiktok.com/@omziey"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-customBorder bg-white shadow-sm flex items-center justify-center text-textMuted hover:text-accent hover:border-accent/40 transition-all hover:scale-105"
              aria-label="TikTok handle"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0h88a121.18,121.18,0,0,0,1.86,22.33A122.55,122.55,0,0,0,448,109V209.91Z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Lower footer copyright row */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs text-textMuted font-sans block">
              © 2025 Flexi. All rights reserved.
            </span>
            <span className="text-[10px] text-textMuted/45 font-sans block mt-1 hover:text-accent transition-colors">
              Built for people who are serious about change.
            </span>
          </div>

          {/* Up arrow indicator */}
          <button
            id="footer-scroll-top-btn"
            onClick={handleScrollToTop}
            className="p-3 border border-customBorder bg-white shadow-sm rounded-full text-textMuted hover:text-accent hover:border-accent/25 transition-all group scale-90"
            title="Back to Top"
            aria-label="Back to top button"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
