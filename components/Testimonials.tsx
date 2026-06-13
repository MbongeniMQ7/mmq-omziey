import React, { useEffect, useState } from 'react';
import { Star, Quote, ShieldCheck, PenLine, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, type Review } from '../lib/supabase';

interface FormState {
  quote: string;
  client: string;
  program: string;
  milestone: string;
  rating: number;
}

const PROGRAMS = ['Strength Foundation', 'Athletic Performance', 'Body Recomposition'];

export default function Testimonials() {
  const [testimonialsData, setTestimonialsData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    quote: '', client: '', program: PROGRAMS[0], milestone: '', rating: 5
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setTestimonialsData(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await supabase.from('reviews').insert([form]);
    setSubmitting(false);
    if (error) {
      setSubmitError(error.message);
    } else {
      setSubmitted(true);
      setForm({ quote: '', client: '', program: PROGRAMS[0], milestone: '', rating: 5 });
      await fetchReviews();
      setTimeout(() => { setSubmitted(false); setModalOpen(false); }, 2000);
    }
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-primary relative overflow-hidden border-b border-customBorder select-none">
      
      {/* Decorative gradient overlay */}
      <div className="absolute right-0 bottom-0 w-[45vw] h-[45vh] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-accent uppercase block mb-3">Athletic Proof</span>
          <h2 id="testimonials-heading" className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-textPrimary uppercase leading-none">
            REAL PEOPLE. REAL RESULTS.
          </h2>
          <p className="text-textMuted mt-4 text-sm sm:text-base font-sans">
            We measure success in kilos lifted, seconds cut, and years added to life. Read the actual journals of active Flexi athletes.
          </p>

          {/* Add Review Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 bg-accent text-white text-sm font-bold tracking-wider uppercase rounded-full hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20 select-none"
          >
            <PenLine className="w-4 h-4" />
            Share Your Results
          </button>
        </div>

        {/* Add Review Modal */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative border border-customBorder"
              >
                {/* Close */}
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-primary hover:bg-accent/10 flex items-center justify-center text-textMuted hover:text-accent transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-4">
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                      <ShieldCheck className="w-7 h-7 text-accent" />
                    </div>
                    <p className="text-lg font-display font-black text-textPrimary uppercase">Review Submitted!</p>
                    <p className="text-textMuted text-sm">Thanks for sharing your results.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <span className="text-xs font-bold tracking-widest text-accent uppercase">Your Story</span>
                      <h3 className="text-2xl font-display font-black text-textPrimary uppercase mt-1">Share Your Results</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      {/* Star Rating */}
                      <div>
                        <label className="text-[10px] font-mono font-bold text-textMuted uppercase tracking-widest block mb-2">Rating</label>
                        <div className="flex gap-2">
                          {[1,2,3,4,5].map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setForm(f => ({ ...f, rating: n }))}
                              className="transition-transform hover:scale-110"
                            >
                              <Star className={`w-6 h-6 transition-colors ${n <= form.rating ? 'fill-accent text-accent' : 'text-customBorder'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quote */}
                      <div>
                        <label className="text-[10px] font-mono font-bold text-textMuted uppercase tracking-widest block mb-1.5">Your Review</label>
                        <textarea
                          required
                          rows={3}
                          value={form.quote}
                          onChange={e => setForm(f => ({ ...f, quote: e.target.value }))}
                          placeholder="Tell us about your transformation..."
                          className="w-full rounded-xl border border-customBorder bg-primary px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/60 focus:outline-none focus:border-accent resize-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Name */}
                        <div>
                          <label className="text-[10px] font-mono font-bold text-textMuted uppercase tracking-widest block mb-1.5">Your Name</label>
                          <input
                            required
                            type="text"
                            value={form.client}
                            onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                            placeholder="e.g. Thabo M."
                            className="w-full rounded-xl border border-customBorder bg-primary px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/60 focus:outline-none focus:border-accent transition-colors"
                          />
                        </div>

                        {/* Program */}
                        <div>
                          <label className="text-[10px] font-mono font-bold text-textMuted uppercase tracking-widest block mb-1.5">Program</label>
                          <select
                            value={form.program}
                            onChange={e => setForm(f => ({ ...f, program: e.target.value }))}
                            className="w-full rounded-xl border border-customBorder bg-primary px-4 py-3 text-sm text-textPrimary focus:outline-none focus:border-accent transition-colors"
                          >
                            {PROGRAMS.map(p => <option key={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Milestone */}
                      <div>
                        <label className="text-[10px] font-mono font-bold text-textMuted uppercase tracking-widest block mb-1.5">Milestone Reached</label>
                        <input
                          required
                          type="text"
                          value={form.milestone}
                          onChange={e => setForm(f => ({ ...f, milestone: e.target.value }))}
                          placeholder="e.g. Lost 10kg, Squat +40kg"
                          className="w-full rounded-xl border border-customBorder bg-primary px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted/60 focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>

                      {submitError && (
                        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{submitError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-2 flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white text-sm font-bold tracking-wider uppercase rounded-full hover:bg-accent/90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                      >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid of Testimonials */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-textMuted text-sm py-8">Could not load reviews: {error}</p>
        )}

        {!loading && !error && testimonialsData.length === 0 && (
          <p className="text-center text-textMuted text-sm py-8">No reviews yet. Be the first!</p>
        )}

        {!loading && !error && testimonialsData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white relative rounded-2xl p-6 md:p-8 border border-customBorder flex flex-col justify-between transition-all duration-300 hover:border-accent/25 hover:translate-y-[-4px] pink-border-glow border-t-4 !border-t-accent shadow-sm hover:shadow-md"
              style={{ borderTopWidth: '4px' }}
            >
              {/* Back quote mark representation */}
              <div className="absolute right-6 top-6 text-accent/5 pointer-events-none">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              <div>
                {/* 5-Star Rating Indicators */}
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating ?? 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-lg text-textPrimary/95 italic leading-relaxed mb-8 font-sans">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Info and Program Tag */}
              <div className="pt-6 border-t border-customBorder flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-textPrimary text-base font-sans leading-none">{item.client}</h3>
                    <span className="text-xs text-accent font-semibold tracking-wider uppercase inline-block mt-1 font-sans">
                      {item.program}
                    </span>
                  </div>
                  
                  {/* Verified outcome stamp */}
                  <div className="px-2 py-1 rounded bg-accent/10 border border-accent/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[9px] font-mono font-bold text-accent uppercase">VERIFIED</span>
                  </div>
                </div>

                {/* Physical Milestone Summary */}
                <div className="bg-primary/90 rounded-lg p-2.5 border border-customBorder text-left">
                  <span className="text-[9px] font-mono text-textMuted uppercase block">Milestone Reached:</span>
                  <span className="text-xs text-textPrimary font-semibold font-sans block mt-0.5">{item.milestone}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
        )}

      </div>
    </section>
  );
}
