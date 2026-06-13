import React, { useState } from 'react';
import { Dumbbell, Apple, Brain } from 'lucide-react';
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

  const currentPillar = pillars.find(p => p.id === activeTab) || pillars[0];

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

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col gap-16 items-center">
          
          {/* Philosophy Content */}
          <div className="w-full flex flex-col items-start">
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

        </div>
      </div>
    </section>
  );
}
