import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Check, AlertCircle, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Invalid phone number format';
    }

    if (!formData.goal) tempErrors.goal = 'Please select your fitness goal';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      // Simulate premium server latency
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-primary relative overflow-hidden border-b border-customBorder select-none">
      
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-accent/2 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest text-accent uppercase block mb-3">Instant Booking</span>
          <h2 id="contact-heading" className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-textPrimary uppercase leading-none">
            READY TO START?
          </h2>
          <p className="text-textMuted mt-4 text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
            Book a free 30-minute consultation. No commitment. Just an active, data-backed conversation about your goals.
          </p>
        </div>

        {/* Success Card or Contact Form */}
        <div className="bg-white border border-customBorder rounded-2xl p-6 sm:p-10 text-left pink-border-glow shadow-xl max-w-2xl mx-auto">
          {isSubmitted ? (
            <div id="contact-success" className="text-center py-8 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-black text-textPrimary uppercase tracking-wide mb-3">
                Booking Proposal Received!
              </h3>
              <p className="text-textMuted font-sans text-sm sm:text-base max-w-md mx-auto mb-8">
                Thanks, <span className="text-textPrimary font-bold">{formData.name}</span>! Our head athletic coordinator will reach out to scheduling via <span className="text-textPrimary font-bold">{formData.email}</span> within 2 hours.
              </p>

              {/* Submitted summaries */}
              <div className="bg-primary/90 rounded-xl p-4 border border-customBorder text-left max-w-sm mx-auto mb-8 space-y-2 font-sans text-xs">
                <div className="flex justify-between border-b border-customBorder pb-2">
                  <span className="text-textMuted uppercase">Goal Category</span>
                  <span className="text-accent font-semibold uppercase">{formData.goal}</span>
                </div>
                <div className="flex justify-between border-b border-customBorder pb-2">
                  <span className="text-textMuted uppercase">Contact Phone</span>
                  <span className="text-textPrimary font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted uppercase">Diagnostic Block</span>
                  <span className="text-accent font-mono font-bold">FLEXI-COMP-30</span>
                </div>
              </div>

              {/* Direct WhatsApp escalation */}
              <div className="space-y-4">
                <p className="text-xs text-textMuted font-sans">Want immediate speed schedules? Escalated text on WhatsApp:</p>
                <a
                  href={`https://wa.me/27820000000?text=Hi%20Flexi,%20my%20name%20is%20${encodeURIComponent(formData.name)}.%20I%20just%20submitted%20the%20booking%20and%20want%20to%20set%20up%20my%20${encodeURIComponent(formData.goal)}%20consultation!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white hover:bg-[#20ba56] text-xs font-bold uppercase tracking-wider rounded-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Message On WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form id="contact-booking-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name-input" className="text-xs uppercase font-bold tracking-widest text-textPrimary font-sans">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Thabo Khumalo"
                    className={`w-full bg-primary/45 border py-3 px-4 rounded-xl text-textPrimary placeholder:text-textMuted/45 focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all font-sans text-sm ${
                      errors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-customBorder'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-sans">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email-input" className="text-xs uppercase font-bold tracking-widest text-textPrimary font-sans">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. thabo@gmail.com"
                    className={`w-full bg-primary/45 border py-3 px-4 rounded-xl text-textPrimary placeholder:text-textMuted/45 focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all font-sans text-sm ${
                      errors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-customBorder'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-sans">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone-input" className="text-xs uppercase font-bold tracking-widest text-textPrimary font-sans">
                    Phone Number <span className="text-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +27 82 123 4567"
                    className={`w-full bg-primary/45 border py-3 px-4 rounded-xl text-textPrimary placeholder:text-textMuted/45 focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all font-sans text-sm ${
                      errors.phone ? 'border-red-500/50 focus:ring-red-500' : 'border-customBorder'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-sans">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </span>
                  )}
                </div>

                {/* Goals Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="goal-select" className="text-xs uppercase font-bold tracking-widest text-textPrimary font-sans">
                    Primary Goal & Vector <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="goal-select"
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      className={`w-full bg-primary/45 border py-3 px-4 rounded-xl text-textPrimary appearance-none focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all font-sans text-sm ${
                        errors.goal ? 'border-red-500/50 focus:ring-red-500' : 'border-customBorder'
                      }`}
                    >
                      <option value="" disabled className="text-textMuted/40">Select your focus...</option>
                      <option value="Lose Weight">Lose Weight (Body Recomp)</option>
                      <option value="Build Muscle">Build Muscle (Strength foundation)</option>
                      <option value="Improve Performance">Improve Performance (Athletic Speed)</option>
                      <option value="General Fitness">General Longevity & Wellness</option>
                    </select>
                    {/* Custom Caret indicator */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-textMuted">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                  {errors.goal && (
                    <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-sans">
                      <AlertCircle className="w-3 h-3" /> {errors.goal}
                    </span>
                  )}
                </div>

              </div>

              {/* Message (Optional) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message-input" className="text-xs uppercase font-bold tracking-widest text-textPrimary font-sans">
                  Any injuries or training history notes? (Optional)
                </label>
                <textarea
                  id="message-input"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us briefly about injuries, medical targets, or workout history..."
                  className="w-full bg-primary/45 border border-customBorder focus:bg-white py-3 px-4 rounded-xl text-textPrimary placeholder:text-textMuted/40 focus:outline-none focus:ring-1 focus:ring-accent transition-all font-sans text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit"
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-white font-bold py-4 rounded-full uppercase tracking-widest text-xs hover:bg-accent/95 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-sans flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
              >
                {isLoading ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                ) : (
                  <>
                    Confirm Consultation Booking
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

        {/* Support Links Segment (Beneath form) */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-sm">
          <a
            id="support-nav-email"
            href="mailto:coaching@flexi.fit"
            className="flex items-center gap-2.5 text-textMuted hover:text-accent transition-colors font-sans"
          >
            <Mail className="w-4 h-4 text-accent" />
            coaching@flexi.fit
          </a>
          
          <span className="hidden sm:inline text-customBorder">|</span>

          <a
            id="support-nav-wa"
            href="https://wa.me/27820000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-textMuted hover:text-accent transition-colors font-sans"
          >
            <Phone className="w-4 h-4 text-accent" />
            WhatsApp Chat Support
          </a>
        </div>

      </div>
    </section>
  );
}
