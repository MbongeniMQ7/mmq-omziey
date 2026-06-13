import React, { useState } from 'react';
import { Calendar, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Programs() {
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

  const programsData = [
    {
      id: 1,
      title: 'STRENGTH FOUNDATION',
      tagline: 'For beginners building base strength & robust skeletal frame.',
      duration: '8 Weeks',
      frequency: '3x / week',
      isPopular: false,
      benefits: [
        'Master the fundamental squat, hinge, push, and pull vectors safely',
        'Build multi-joint tendon thickness and load capacity',
        'Learn systematic warm-up and loading protocols to bypass plateaus'
      ],
      details: {
        focus: 'Compound mechanics, absolute strength, mobility groundwork',
        idealFor: 'Busy professionals, sports novices, or individuals returning to the gym after an extended hiatus.',
        weeklyRatio: '70% Strength | 20% Mobility | 10% Core Conditioning',
        metric: '+35% Overall Load Lifted'
      }
    },
    {
      id: 2,
      title: 'ATHLETIC PERFORMANCE',
      tagline: 'For athletes wanting to compete, explode, and sprint at a premium level.',
      duration: '12 Weeks',
      frequency: '5x / week',
      isPopular: true,
      benefits: [
        'Enhance absolute power output, velocity indices, and vertical jump metrics',
        'Fast-twitch muscle fibers recruitment through plyometric protocols',
        'Multi-directional agility training & rapid lateral force production'
      ],
      details: {
        focus: 'Force velocity curve, speed, lactic capacity, athletic resilience',
        idealFor: 'Competitive club players, runners, crossfitters, or individuals craving raw athletic superiority.',
        weeklyRatio: '50% Explosive Power | 30% Conditioning | 20% Joint Durability',
        metric: '-0.4s 100m Sprint Time'
      }
    },
    {
      id: 3,
      title: 'BODY RECOMPOSITION',
      tagline: 'Burn fat, build muscle simultaneously through clean metabolic stress.',
      duration: '16 Weeks',
      frequency: '4x / week',
      isPopular: false,
      benefits: [
        'Preserve and develop hypertrophy assets while maintaining caloric deficit',
        'Optimize natural endocrine patterns via customized mechanical load cycles',
        'Elevated post-exercise oxygen consumption (EPOC) protocols for fat loss'
      ],
      details: {
        focus: 'Hypertrophy mechanics, density workouts, energy system manipulation',
        idealFor: 'Individuals aiming to build definition, shift stubborn visceral fat, and reshape body contours.',
        weeklyRatio: '60% Hypertrophy | 30% Metabolic Conditioning | 10% Nutrition Coaching',
        metric: '-12kg Avg Fat Mass Loss'
      }
    }
  ];

  return (
    <section id="programs" className="py-24 md:py-32 bg-primary relative border-b border-customBorder select-none">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        src="/gym2.mp4"
      />
      {/* Absolute Decorative elements */}}
      <div className="absolute right-10 top-1/4 w-72 h-72 rounded-full bg-accent/5 filter blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-1/4 w-72 h-72 rounded-full bg-accent/3 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-accent uppercase block mb-3">Your Journey</span>
            <h2 id="programs-heading" className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-textPrimary uppercase leading-none">
              PICK YOUR PATH
            </h2>
          </div>
          <p className="text-textMuted max-w-sm md:text-right text-sm sm:text-base">
            No cookie-cutter routines. Select the vector that matches your physiological requirements.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.map((prog) => (
            <div
              key={prog.id}
              className={`bg-white relative rounded-2xl p-6 md:p-8 border min-h-[480px] transition-all duration-300 flex flex-col justify-between ${
                prog.isPopular
                  ? 'border-accent/35 shadow-xl shadow-accent/5 scale-102 pink-border-glow md:-translate-y-2'
                  : 'border-customBorder hover:border-accent/20 hover:-translate-y-1 shadow-sm'
              }`}
            >
              <div>
                {/* Popular Badge */}
                {prog.isPopular && (
                  <span className="absolute -top-3.5 left-6 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase font-sans shadow-md">
                    ★ MOST POPULAR PATH
                  </span>
                )}

                {/* Badges / Metrics */}
                <div className="flex flex-wrap gap-2 items-center mb-6 mt-1">
                  <span className="bg-primary/80 border border-customBorder py-1 px-3 rounded-full text-xs font-medium text-textPrimary flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {prog.duration}
                  </span>
                  <span className="bg-primary/80 border border-customBorder py-1 px-3 rounded-full text-xs font-medium text-textPrimary flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-accent" />
                    {prog.frequency}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-display font-black tracking-wide text-textPrimary uppercase mb-3">
                  {prog.title}
                </h3>
                
                {/* Tagline */}
                <p className="text-sm text-textMuted leading-relaxed mb-6 font-sans">
                  {prog.tagline}
                </p>

                {/* Separator line - lime */}
                <div className="h-[1px] w-full bg-accent/20 mb-6" />

                {/* Benefits Bullet list */}
                <ul className="space-y-3.5 mb-8">
                  {prog.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="flex gap-2.5 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5"></span>
                      <p className="text-xs sm:text-sm text-textPrimary/80 leading-relaxed font-sans">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expanded Area for Learn More */}
              <div className="mt-4 pt-4 border-t border-customBorder">
                {expandedProgram === prog.id ? (
                  <div className="bg-primary/95 border border-customBorder rounded-xl p-4 mb-4 text-left animate-fadeIn shadow-inner">
                    <div className="mb-3">
                      <span className="text-[10px] font-mono text-textMuted uppercase block">Core Focus Area:</span>
                      <p className="text-xs text-textPrimary font-semibold">{prog.details.focus}</p>
                    </div>
                    <div className="mb-3">
                      <span className="text-[10px] font-mono text-textMuted uppercase block">Ideal Athlete Match:</span>
                      <p className="text-xs text-textPrimary">{prog.details.idealFor}</p>
                    </div>
                    <div className="mb-3 flex justify-between items-center bg-white p-2.5 rounded border border-customBorder shadow-sm">
                      <div>
                        <span className="text-[9px] font-mono text-accent uppercase block">Target Stat Return:</span>
                        <p className="text-xs font-bold text-accent">{prog.details.metric}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-textMuted uppercase block">Workload Ratio:</span>
                        <p className="text-[10px] text-textPrimary">{prog.details.weeklyRatio.split('|')[0]}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedProgram(null)}
                      className="text-xs font-bold text-accent hover:text-accent/80 font-sans uppercase underline block mt-2"
                    >
                      Hide Details
                    </button>
                  </div>
                ) : null}

                {/* Action Row */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (expandedProgram === prog.id) {
                        setExpandedProgram(null);
                      } else {
                        setExpandedProgram(prog.id);
                      }
                    }}
                    className="text-xs uppercase font-bold tracking-widest text-textPrimary hover:text-accent transition-colors flex items-center gap-1 group font-sans"
                  >
                    {expandedProgram === prog.id ? 'Close info' : 'Learn More'}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>

                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center py-2 px-4 rounded-lg bg-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 border border-customBorder text-textPrimary text-xs font-bold tracking-wider uppercase font-sans shadow-sm"
                  >
                    Select
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Quality stamp bar */}
        <div className="mt-16 bg-white border border-customBorder rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase text-textPrimary">Flexible Programming Guarantee</p>
              <p className="text-xs text-textMuted">Swap paths or schedules smoothly if work or athletic circumstances fluctuate.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-xs font-mono px-3 py-1 bg-primary rounded border border-customBorder text-textPrimary font-semibold">8 Weeks Block</span>
            <span className="text-xs font-mono px-3 py-1 bg-primary rounded border border-customBorder text-textPrimary font-semibold">1-on-1 Audited</span>
          </div>
        </div>

      </div>
    </section>
  );
}
