import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavClick: (id: string) => void;
  videoUrl?: string;
  videoEnabled?: boolean;
  videoOpacity?: number;
}

export default function Hero({ onNavClick, videoUrl, videoEnabled, videoOpacity = 0.55 }: HeroProps) {
  const [currentVideoSrc, setCurrentVideoSrc] = useState(videoUrl || '/fexi.mp4');

  useEffect(() => {
    if (videoUrl) {
      setCurrentVideoSrc(videoUrl);
    }
  }, [videoUrl]);

  const handleVideoError = () => {
    if (currentVideoSrc === '/fexi.mp4') {
      setCurrentVideoSrc('https://assets.mixkit.co/videos/preview/mixkit-young-woman-doing-stretching-exercises-on-a-gym-mat-40157-large.mp4');
    }
  };

  const handleScrollClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    onNavClick(targetId);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-24 pb-28"
    >
      {/* Decorative background with premium mesh and glowing pink ambient rings */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {videoEnabled && currentVideoSrc && (
          <>
            <video
              key={currentVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              style={{ opacity: videoOpacity }}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 object-center"
              src={currentVideoSrc}
              onError={handleVideoError}
            />
            {/* Soft dark scrim to keep text readable over video */}
            <div className="absolute inset-0 bg-black/30" />
          </>
        )}
        {/* Ambient glow blobs */}
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 filter blur-[150px] animate-pulse duration-[6000ms]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent/4 filter blur-[120px] animate-pulse duration-[8000ms]"></div>
        
        {/* Tech grid/abstract overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(25,20,23,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Abstract vector decorative lines that represent movement & exercise gears */}
        <svg
          className="absolute right-0 bottom-0 top-0 h-full w-1/2 opacity-20 pointer-events-none text-accent hidden lg:block"
          viewBox="0 0 500 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 100 L450 400 L250 700"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <circle cx="250" cy="400" r="180" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="250" cy="400" r="184" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
          <path
            d="M 150,400 A 100,100 0 0,1 350,400"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Decorative speed lines */}
          <line x1="50" y1="200" x2="150" y2="200" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="250" x2="150" y2="250" stroke="currentColor" strokeWidth="2" />
          <line x1="120" y1="300" x2="150" y2="300" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center">
        {/* Centered Headline & CTAs */}
        <div id="hero-main-content" className="w-full">
          {/* Tiny kicker tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full text-accent text-xs font-bold tracking-widest uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            TRAIN SMARTER. MOVE BETTER. LIVE LONGER.
          </motion.div>

          {/* Epic Headline in Bebas Neue */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-90px xl:text-[96px] font-display font-extrabold text-textPrimary leading-[0.9] uppercase tracking-wider select-none mb-6"
          >
            YOUR BODY.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/95 to-textPrimary pink-text-glow">
              YOUR RULES.
            </span>
            <br />
            YOUR RESULTS.
          </motion.h1>

          {/* Catchy Subheadline */}
          <motion.p
            id="hero-subheading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-textMuted max-w-xl mx-auto font-sans leading-relaxed mb-10"
          >
            Flexi pairs expert coaching with smart programming to build the body and habits that last — not just the 12-week sprint.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              id="hero-cta-consult"
              href="#contact"
              onClick={(e) => handleScrollClick(e, 'contact')}
              className="w-full sm:w-auto px-8 py-4 bg-accent text-white text-sm font-bold tracking-wider uppercase rounded-full hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all text-center shadow-lg shadow-accent/25"
            >
              Book Free Consultation
            </a>
            <a
              id="hero-cta-programs"
              href="#programs"
              onClick={(e) => handleScrollClick(e, 'programs')}
              className="w-full sm:w-auto px-8 py-4 border border-textPrimary/20 text-textPrimary text-sm font-bold tracking-wider uppercase rounded-full hover:bg-accent/5 hover:border-accent transition-all text-center"
            >
              See Programs
            </a>
          </motion.div>
        </div>
      </div>

      {/* Hanging indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <a
          href="#about"
          onClick={(e) => handleScrollClick(e, 'about')}
          className="text-textMuted hover:text-accent flex flex-col items-center gap-1 text-[10px] uppercase font-bold tracking-widest transition-colors duration-200"
        >
          Scroll to Explore
          <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
        </a>
      </div>
    </section>
  );
}
