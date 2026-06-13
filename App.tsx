import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Trainers from './components/Trainers';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VideoBackgroundControls, { VideoSettings } from './components/VideoBackgroundControls';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Load video settings from local storage or set defaults mirroring the uploaded clips
  const [videoSettings, setVideoSettings] = useState<VideoSettings>(() => {
    try {
      const saved = localStorage.getItem('flexi_video_settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // Ignored
    }
    return {
      enabled: true,
      heroVideoUrl: '/fexi.mp4',
      aboutVideoUrl: '/back.mp4',
      programsVideoUrl: '/gym.mp4',
      heroOpacity: 0.55
    };
  });

  // Save settings when changed
  const handleVideoSettingsChange = (newSettings: VideoSettings) => {
    setVideoSettings(newSettings);
    try {
      localStorage.setItem('flexi_video_settings', JSON.stringify(newSettings));
    } catch (e) {
      // Ignored
    }
  };

  // Active nav link highlighting based on scroll position using Intersection Observer
  useEffect(() => {
    const sections = ['hero', 'about', 'programs', 'trainers', 'testimonials', 'contact'];
    
    // Config: triggers when section covers central 40% of page
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler with robust offset calculation
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update URL hash safely without jumping page focus
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch (err) {
        // Fallback for restricted frames
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary text-textPrimary font-sans antialiased selection:bg-accent selection:text-primary">
      {/* 1. Sticky transparent Navbar with scroll trigger backdrop blur */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      <main>
        {/* 2. Full-Viewport Hero with epic Bebe Neue condensed headline */}
        <Hero 
          onNavClick={handleNavClick} 
          videoUrl={videoSettings.heroVideoUrl} 
          videoEnabled={videoSettings.enabled} 
          videoOpacity={videoSettings.heroOpacity} 
        />

        {/* 3. About philosophy pillars with custom active-state dashboard */}
        <About 
          videoUrl={videoSettings.aboutVideoUrl} 
          videoEnabled={videoSettings.enabled} 
        />

        {/* 4. Path selection block with 3 program cards and detail drawers */}
        <Programs 
          videoUrl={videoSettings.programsVideoUrl} 
          videoEnabled={videoSettings.enabled} 
        />

        {/* 5. Coach introduction section with interactive initials and certifications */}
        <Trainers />

        {/* 6. High-converting on-scroll count-up statistics strip */}
        <Stats />

        {/* 7. Premium star feedback section with top-accent borders */}
        <Testimonials />

        {/* 8. Dedicated Consultation lead-capture booking form */}
        <Contact />
      </main>

      {/* 9. Sleek low-contrast brand Footer wrapper */}
      <Footer onNavClick={handleNavClick} />

      {/* 10. Background video control center */}
      <VideoBackgroundControls settings={videoSettings} onChange={handleVideoSettingsChange} />
    </div>
  );
}
