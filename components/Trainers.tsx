import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function Trainers() {
  const trainersData = [
    {
      id: 1,
      initials: 'AM',
      name: 'Alex M.',
      specialty: 'Strength & Conditioning',
      experience: '7 Years',
      rating: '4.9/5',
      bio: 'Specialises in biomechanically sound compound building, structural strength gains, and neural load-adaptation systems.',
      certifications: ['CSCS *D', 'USAW L2', 'FMS Certified']
    },
    {
      id: 2,
      initials: 'JL',
      name: 'Jordan L.',
      specialty: 'Sports Performance',
      experience: '5 Years',
      rating: '5.0/5',
      bio: 'Focuses on power development indices, acceleration mechanics, and sports agility programming for competitive elite athletes.',
      certifications: ['PES-NASM', 'EXOS performance', 'CF-L3']
    },
    {
      id: 3,
      initials: 'SK',
      name: 'Sam K.',
      specialty: 'Holistic Wellness',
      experience: '6 Years',
      rating: '4.8/5',
      bio: 'Bridges stress integration, custom nutrition macros strategy, and habit longevity mechanisms for long-term health metrics.',
      certifications: ['Precision Nutrition L2', 'PN Habit coach', 'CES']
    }
  ];

  return (
    <section id="trainers" className="py-24 md:py-32 bg-primary relative overflow-hidden border-b border-customBorder select-none">
      
      {/* Visual back accents */}
      <div className="absolute left-[10%] top-[40%] w-[50vw] h-[50vh] bg-accent/2 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-accent uppercase block mb-3">Guiding Force</span>
          <h2 id="trainers-heading" className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-textPrimary uppercase leading-none">
            YOUR COACHES
          </h2>
          <p className="text-textMuted max-w-lg mt-4 text-sm sm:text-base mx-auto">
            No dynamic influencers typing workouts on their couch. Your coaches are active, accredited biomechanics partners committed to actual data returns.
          </p>
        </div>

        {/* Trainers Container: Horizontal Scroll on Mobile, Grid on Desktop */}
        <div
          id="trainers-container"
          className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory no-scrollbar pb-6 md:pb-0"
        >
          {trainersData.map((trainer) => (
            <div
              key={trainer.id}
              className="min-w-[85vw] sm:min-w-[50vw] md:min-w-0 snap-center bg-white border border-customBorder rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent/30 hover:scale-[1.02] group"
            >
              <div>
                {/* Avatar area: Glowing Initials placeholder */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary border-2 border-customBorder group-hover:border-accent/40 flex items-center justify-center relative shadow-inner transition-colors duration-300 overflow-hidden">
                    <div className="absolute inset-1 rounded-full bg-accent/5 flex items-center justify-center">
                      <span className="text-3xl font-display font-extrabold text-accent tracking-wider transition-colors">
                        {trainer.initials}
                      </span>
                    </div>
                    {/* Glowing outer animation accent */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>

                  <div className="text-right">
                    <span className="block text-xs font-mono text-textMuted uppercase">EXPERIENCE</span>
                    <span className="text-lg font-display font-bold text-accent">{trainer.experience}</span>
                  </div>
                </div>

                {/* Trainer Info */}
                <h3 className="text-2xl font-display font-extrabold text-textPrimary uppercase tracking-wide mb-1">
                  {trainer.name}
                </h3>
                
                {/* Specialty */}
                <p className="text-xs font-mono font-medium tracking-wider text-accent uppercase mb-4">
                  {trainer.specialty}
                </p>

                {/* Divider */}
                <div className="h-[1px] w-full bg-customBorder mb-4" />

                {/* Bio text */}
                <p className="text-sm text-textMuted leading-relaxed mb-6 font-sans">
                  {trainer.bio}
                </p>

                {/* Certifications tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {trainer.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="text-[9px] font-mono uppercase bg-primary border border-customBorder text-textPrimary px-2 py-1 rounded"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTAs inside each trainer card */}
              <div className="mt-auto pt-4 border-t border-customBorder flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-textPrimary font-mono">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  {trainer.rating} Rating
                </span>

                <a
                  href="#contact"
                  className="p-2 border border-customBorder rounded-full group-hover:bg-accent group-hover:border-accent text-textPrimary group-hover:text-white transition-all duration-300 transform group-hover:rotate-45"
                  aria-label={`Inquire directly with coach ${trainer.name}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile slide swipe helper indicator */}
        <div className="flex md:hidden justify-center gap-1.5 mt-4">
          <span className="w-5 h-1.5 rounded-full bg-accent"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-border border border-customBorder"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-border border border-customBorder"></span>
        </div>

      </div>
    </section>
  );
}
