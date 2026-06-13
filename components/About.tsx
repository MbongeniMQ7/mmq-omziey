import React, { useState } from 'react';
import { Dumbbell, Apple, Brain, CheckCircle, Activity, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const [activeTab, setActiveTab ] = useState<'programming' | 'nutrition' | 'mindset'>('programming');

  const pillars = [
    {
      id: 'programming' as const,
      icon: <Dumbbell className="w-5 h-5 text-accent" />,
      title: 'Smart Programming',
      subtitle: 'Science-backed periodisation',
      bullets: [
        'Custom progression structures tailored to your mechanics',
        'Built-in fatigue management systems to prevent injury',
        'Data-driven training adjustments based on biofeedback',
      ],
      tagline: 'We build systems around your lifestyle, not the other way around.',
      stat: '98%',
      statLabel: 'Injury-Free Training',
    },
    {
      id: 'nutrition' as const,
      icon: <Apple className="w-5 h-5 text-accent" />,
      title: 'Nutrition Integration',
      subtitle: 'Food plans that fuel, not restrict',
      bullets: [
        'Flexible macronutrient targets suited for high outputs',
        'No toxic restriction: enjoy your favorite cultural elements',
        'Grocery shortcuts & fast, high-protein meal prep strategies',
      ],
      tagline: 'Sustainability is structural integrity. Eat for performance AND pleasure.',
      stat: '100%',
      statLabel: 'Zero starvation promises',
    },
    {
      id: 'mindset' as const,
      icon: <Brain className="w-5 h-5 text-accent" />,
      title: 'Mindset Coaching',
      subtitle: 'Habits that outlast motivation',
      bullets: [
        'Systemic habit loops linked directly to your morning routines',
        'Mental resilience strategies for high-stress workweeks',
        '1-on-1 feedback reviews for continuous behavioral alignment',
      ],
      tagline: 'Motivation initiates the process; smart habits secure the longevity.',
      stat: '85%',
      statLabel: 'Retention Rate Over 12 Months',
    }
  ];

  const currentTabInfo = pillars.find(p => p.id === activeTab) || pillars[0];

  return (
    <section id="about" className="py-24 md:py-32 bg-primary relative overflow-hidden border-b border-customBorder">
      {/* Background grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.5" fill="rgba(25, 20, 23, 0.2)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text Content & Philosophy Cards */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4">Philosophy</span>
            <h2 id="about-heading" className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-textPrimary leading-none uppercase mb-6">
              WE DON'T DO
              <br />
              <span className="text-accent underline decoration-accent/20 underline-offset-8">ONE-SIZE FITS ALL</span>
            </h2>
            <p className="text-textMuted max-w-lg mb-10 text-base sm:text-lg">
              Generic templates are designed to fail you. At Flexi, we diagnose before we prescribe. True peak health requires an integrated triad: optimal programming, sustainable nutrition, and permanent mental habits.
            </p>

            {/* Philosophy Cards Map */}
            <div className="w-full flex flex-col gap-4">
              {pillars.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`text-left w-full p-5 rounded-lg border transition-all duration-300 ${
                    activeTab === pillar.id
                      ? 'bg-white border-accent/25 pink-border-glow shadow-sm'
                      : 'bg-white/40 border-customBorder hover:border-accent/20 hover:bg-white/80'
                  } border-l-4 !border-l-accent`}
                  style={{ borderLeftWidth: '4px' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary rounded-md border border-customBorder">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-textPrimary uppercase tracking-wide">{pillar.title}</h3>
                      <p className="text-sm text-textMuted">{pillar.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Deep Dive Visual Dashboard */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white border border-customBorder rounded-2xl p-6 md:p-8 relative pink-border-glow shadow-md select-none">
              
              {/* Corner tech detailing */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest">ACTIVE DIAGNOSTICS</span>
              </div>

              {/* Dynamic Header */}
              <div className="mb-6 pb-6 border-b border-customBorder">
                <span className="text-xs font-mono text-textMuted uppercase tracking-wider">PILLAR FOCUS DEEPDIVE</span>
                <h3 className="text-2xl font-display font-black text-accent tracking-wide uppercase mt-1">
                  {currentTabInfo.title}
                </h3>
              </div>

              {/* Graphical Spec Diagram */}
              <div className="relative h-48 bg-primary/60 rounded-xl border border-customBorder flex items-center justify-center p-4 mb-6 overflows-hidden">
                <svg className="w-full h-full text-accent" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Glowing background wave */}
                  <path
                    d="M10 80 Q 40 40 80 70 T 150 90 T 220 30 T 290 60"
                    stroke="rgba(225, 46, 153, 0.4)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M10 80 Q 40 40 80 70 T 150 90 T 220 30 T 290 60"
                    stroke="rgba(25, 20, 23, 0.15)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Dots along trace */}
                  <circle cx="80" cy="70" r="4" fill="#E12E99" className="animate-ping" />
                  <circle cx="80" cy="70" r="2.5" fill="#E12E99" />
                  <circle cx="220" cy="30" r="4" fill="#191417" className="animate-ping" />
                  <circle cx="220" cy="30" r="2.5" fill="#191417" />
                  
                  {/* Grid lines */}
                  <line x1="10" y1="20" x2="290" y2="20" stroke="rgba(25,20,23,0.03)" strokeWidth="1" />
                  <line x1="10" y1="60" x2="290" y2="60" stroke="rgba(25,20,23,0.03)" strokeWidth="1" />
                  <line x1="10" y1="100" x2="290" y2="100" stroke="rgba(25,20,23,0.03)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                {/* Left/Right diagnostic telemetry stats overlay */}
                <div className="absolute top-3 left-4 text-left">
                  <span className="text-[10px] font-mono text-textMuted block">METRIC STATE</span>
                  <span className="text-xs font-mono font-bold text-textPrimary">OPTIMAL COMPRESSION</span>
                </div>
                
                <div className="absolute bottom-3 right-4 text-right">
                  <span className="text-[10px] font-mono text-textMuted block">ALGORITHM</span>
                  <span className="text-xs font-mono font-bold text-accent">FLEXI-V3</span>
                </div>
              </div>

              {/* Philosophy bullets */}
              <div className="space-y-4 mb-8">
                {currentTabInfo.bullets.map((bullet, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-textPrimary/90 leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </div>

              {/* Highlight Quote */}
              <div className="p-4 bg-primary/80 border border-customBorder rounded-xl flex items-center justify-between">
                <p className="text-xs italic text-textMuted max-w-[70%]">
                  "{currentTabInfo.tagline}"
                </p>
                <div className="text-right">
                  <span className="block text-xl font-display font-black text-accent">{currentTabInfo.stat}</span>
                  <span className="text-[9px] font-mono uppercase text-textMuted block max-w-[80px] leading-tight">
                    {currentTabInfo.statLabel}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
