import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const omziey = {
  name: 'Omziey',
  specialty: 'Personal Trainer & Coach',
  experience: '2 Years',
  rating: '5.0/5',
  bio: 'Your transformation starts here. Omziey blends science-backed programming with real-world accountability to deliver results that actually stick — from strength gains to full lifestyle shifts.',
  certifications: ['CSCS', 'Precision Nutrition L2', 'FMS Certified'],
  instagram: 'https://www.instagram.com/omziey/',
  image: '/omziey.jpeg' as string | null,
};

export default function Trainers() {
  return (
    <section id="trainers" className="py-24 md:py-32 bg-primary relative overflow-hidden border-b border-customBorder select-none">
      <div className="absolute left-[10%] top-[40%] w-[50vw] h-[50vh] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-accent uppercase block mb-3">Your Guide</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-textPrimary uppercase leading-none">
            MEET YOUR COACH
          </h2>
          <p className="text-textMuted max-w-lg mt-4 text-sm sm:text-base mx-auto">
            One coach. Full dedication. Real results.
          </p>
        </div>

        {/* Single Trainer Card */}
        <div className="flex flex-col md:flex-row items-center gap-12 bg-white border border-customBorder rounded-3xl p-8 md:p-12 shadow-md hover:shadow-xl transition-all duration-300 hover:border-accent/30 group">

          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-customBorder group-hover:border-accent/40 transition-colors relative shadow-lg">
              {omziey.image ? (
                <img src={omziey.image} alt={omziey.name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full bg-accent/10 flex flex-col items-center justify-center">
                  <span className="text-6xl font-display font-bold text-accent">OZ</span>
                  <span className="text-xs font-mono text-accent/60 uppercase mt-2 tracking-widest">Photo coming soon</span>
                </div>
              )}
              {/* Glow ring on hover */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-accent/30 transition-all duration-300" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h3 className="text-4xl md:text-5xl font-display font-bold text-textPrimary uppercase tracking-wide">
                {omziey.name}
              </h3>
              <span className="flex items-center gap-1 text-xs text-white font-mono bg-accent px-2.5 py-1 rounded-full">
                <Star className="w-3 h-3 fill-white" />
                {omziey.rating}
              </span>
            </div>

            <p className="text-sm font-mono font-semibold tracking-widest text-accent uppercase mb-1">
              {omziey.specialty}
            </p>
            <p className="text-xs text-textMuted font-mono uppercase tracking-wider mb-6">
              {omziey.experience} Active Coaching
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
              <div className="flex flex-col items-center md:items-start bg-white border border-customBorder rounded-xl px-5 py-3">
                <span className="text-2xl font-display font-bold text-accent">8+</span>
                <span className="text-[10px] font-mono uppercase text-textMuted tracking-wider">Clients</span>
              </div>
              <div className="flex flex-col items-center md:items-start bg-white border border-customBorder rounded-xl px-5 py-3">
                <span className="text-2xl font-display font-bold text-accent">2</span>
                <span className="text-[10px] font-mono uppercase text-textMuted tracking-wider">Years Coaching</span>
              </div>
              <div className="flex flex-col items-center md:items-start bg-white border border-customBorder rounded-xl px-5 py-3">
                <span className="text-2xl font-display font-bold text-accent">1</span>
                <span className="text-[10px] font-mono uppercase text-textMuted tracking-wider">Location</span>
              </div>
            </div>

            <div className="h-px w-full bg-customBorder mb-6" />

            <p className="text-base text-textMuted leading-relaxed mb-6 font-sans max-w-xl mx-auto md:mx-0">
              {omziey.bio}
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
              {omziey.certifications.map((cert) => (
                <span key={cert} className="text-[10px] font-mono uppercase bg-primary border border-customBorder text-textPrimary px-3 py-1.5 rounded-full">
                  {cert}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-bold tracking-wider uppercase rounded-full hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
              >
                Book a Session
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={omziey.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-customBorder flex items-center justify-center text-textMuted hover:text-accent hover:border-accent/40 transition-all hover:scale-105"
                aria-label="Follow Omziey on Instagram"
              >
                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
