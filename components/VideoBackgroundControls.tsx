import React, { useState } from 'react';
import { Video, VideoOff, Settings, RefreshCw, Layers, Check, ExternalLink } from 'lucide-react';

export interface VideoSettings {
  enabled: boolean;
  heroVideoUrl: string;
  programsVideoUrl: string;
  aboutVideoUrl: string;
  heroOpacity: number;
}

interface VideoBackgroundControlsProps {
  settings: VideoSettings;
  onChange: (newSettings: VideoSettings) => void;
}

const PRESET_VIDEOS = {
  flexibility: '/7.mp4',
  strength: '/gym.mp4',
  cardio: '/back.mp4'
};

export default function VideoBackgroundControls({ settings, onChange }: VideoBackgroundControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleGlobalToggle = () => {
    onChange({ ...settings, enabled: !settings.enabled });
  };

  const handlePresetSelect = (section: 'hero' | 'programs' | 'about', presetKey: keyof typeof PRESET_VIDEOS) => {
    const url = PRESET_VIDEOS[presetKey];
    onChange({
      ...settings,
      [`${section}VideoUrl`]: url
    });
  };

  const handleCustomUrlChange = (section: 'hero' | 'programs' | 'about', url: string) => {
    onChange({
      ...settings,
      [`${section}VideoUrl`]: url
    });
  };

  const handleOpacityChange = (val: number) => {
    onChange({ ...settings, heroOpacity: val });
  };

  const resetToPresets = () => {
    onChange({
      enabled: true,
      heroVideoUrl: '/fexi.mp4',
      programsVideoUrl: '/gym.mp4',
      aboutVideoUrl: '/back.mp4',
      heroOpacity: 0.55
    });
  };

  return (
    <div id="video-control-root" className="fixed bottom-6 right-6 z-50 text-left font-sans select-none">
      {/* Floating Toggle Button */}
      <button
        id="video-control-toggle-btn"
        onClick={toggleOpen}
        className={`p-3.5 rounded-full transition-all duration-300 shadow-lg border flex items-center justify-center ${
          isOpen
            ? 'bg-accent text-white border-accent scale-105'
            : 'bg-white hover:bg-accent/5 hover:border-accent text-textPrimary border-customBorder hover:scale-105'
        }`}
        title="Background Video Adjuster"
        aria-label="Toggle background video adjuster panel"
      >
        <Video className={`w-5 h-5 ${settings.enabled && !isOpen ? 'animate-pulse text-accent' : ''}`} />
      </button>

      {/* Control Panel Bubble */}
      {isOpen && (
        <div
          id="video-control-panel"
          className="absolute bottom-16 right-0 w-[340px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-md border border-customBorder rounded-2xl shadow-xl p-5 animate-fadeIn"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-customBorder mb-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-accent" />
              <h4 className="text-sm font-display font-extrabold text-textPrimary tracking-wider uppercase">Background Media</h4>
            </div>
            <button
              onClick={resetToPresets}
              className="text-[10px] font-mono font-bold text-accent hover:text-accent/80 flex items-center gap-1 uppercase"
              title="Reset files to uploaded video presets"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Master Enabled / Disabled switcher */}
          <div className="flex items-center justify-between p-3 bg-primary rounded-xl border border-customBorder mb-4">
            <div>
              <span className="text-xs font-bold text-textPrimary block">ENABLE VIDEOS</span>
              <span className="text-[10px] text-textMuted block">Muted ambient background loops</span>
            </div>
            <button
              onClick={handleGlobalToggle}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 ${
                settings.enabled
                  ? 'bg-accent/15 text-accent border border-accent/35 font-extrabold'
                  : 'bg-transparent text-textMuted border border-customBorder'
              }`}
            >
              {settings.enabled ? (
                <>
                  <Video className="w-3.5 h-3.5" /> ON
                </>
              ) : (
                <>
                  <VideoOff className="w-3.5 h-3.5" /> OFF
                </>
              )}
            </button>
          </div>

          {settings.enabled && (
            <div className="space-y-4">
              {/* Tab Selector */}
              <div className="flex border-b border-customBorder pb-2 mb-2">
                <button
                  onClick={() => setActiveTab('presets')}
                  className={`flex-1 pb-1.5 text-xs font-bold uppercase tracking-wider transition-colors text-center ${
                    activeTab === 'presets' ? 'text-accent border-b-2 border-accent' : 'text-textMuted hover:text-textPrimary'
                  }`}
                >
                  Presets (Matches Uploads)
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`flex-1 pb-1.5 text-xs font-bold uppercase tracking-wider transition-colors text-center ${
                    activeTab === 'custom' ? 'text-accent border-b-2 border-accent' : 'text-textMuted hover:text-textPrimary'
                  }`}
                >
                  Custom Links
                </button>
              </div>

              {/* Presets Screen */}
              {activeTab === 'presets' && (
                <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                  {/* Hero Mapping */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-textMuted uppercase block">1. HERO BACKGROUND</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => handlePresetSelect('hero', 'flexibility')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.heroVideoUrl === PRESET_VIDEOS.flexibility
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Pink splits/handstands (Upload 1)"
                      >
                        Pink Split
                      </button>
                      <button
                        onClick={() => handlePresetSelect('hero', 'strength')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.heroVideoUrl === PRESET_VIDEOS.strength
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Sandbag lunges (Upload 2)"
                      >
                        Sandbag
                      </button>
                      <button
                        onClick={() => handlePresetSelect('hero', 'cardio')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.heroVideoUrl === PRESET_VIDEOS.cardio
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Planks & training (Upload 3)"
                      >
                        Gym Cardio
                      </button>
                    </div>
                  </div>

                  {/* About Mapping */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-textMuted uppercase block">2. ABOUT BACKGROUND</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => handlePresetSelect('about', 'flexibility')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.aboutVideoUrl === PRESET_VIDEOS.flexibility
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Pink splits/handstands (Upload 1)"
                      >
                        Pink Split
                      </button>
                      <button
                        onClick={() => handlePresetSelect('about', 'strength')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.aboutVideoUrl === PRESET_VIDEOS.strength
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Sandbag lunges (Upload 2)"
                      >
                        Sandbag
                      </button>
                      <button
                        onClick={() => handlePresetSelect('about', 'cardio')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.aboutVideoUrl === PRESET_VIDEOS.cardio
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Planks & training (Upload 3)"
                      >
                        Gym Cardio
                      </button>
                    </div>
                  </div>

                  {/* Programs Mapping */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-textMuted uppercase block">3. PROGRAMS BACKGROUND</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => handlePresetSelect('programs', 'flexibility')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.programsVideoUrl === PRESET_VIDEOS.flexibility
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Pink splits/handstands (Upload 1)"
                      >
                        Pink Split
                      </button>
                      <button
                        onClick={() => handlePresetSelect('programs', 'strength')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.programsVideoUrl === PRESET_VIDEOS.strength
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Sandbag lunges (Upload 2)"
                      >
                        Sandbag
                      </button>
                      <button
                        onClick={() => handlePresetSelect('programs', 'cardio')}
                        className={`py-1.5 text-[10px] font-bold rounded border transition-all ${
                          settings.programsVideoUrl === PRESET_VIDEOS.cardio
                            ? 'bg-accent text-white border-accent'
                            : 'bg-primary border-customBorder text-textMuted hover:text-textPrimary'
                        }`}
                        title="Planks & training (Upload 3)"
                      >
                        Gym Cardio
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Links input Screen */}
              {activeTab === 'custom' && (
                <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                  <p className="text-[10px] text-textMuted leading-relaxed bg-primary px-2.5 py-1.5 border border-customBorder rounded">
                    Paste any direct online hosted MP4 video links below to render your custom uploaded clips.
                  </p>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-textMuted uppercase block">Hero Video URL</label>
                      <input
                        type="text"
                        value={settings.heroVideoUrl}
                        onChange={(e) => handleCustomUrlChange('hero', e.target.value)}
                        placeholder="e.g. https://domain.com/video1.mp4"
                        className="w-full text-xs bg-primary border border-customBorder p-2 rounded focus:outline-none focus:border-accent text-textPrimary placeholder:text-textMuted/40 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-textMuted uppercase block">About Video URL</label>
                      <input
                        type="text"
                        value={settings.aboutVideoUrl}
                        onChange={(e) => handleCustomUrlChange('about', e.target.value)}
                        placeholder="e.g. https://domain.com/video2.mp4"
                        className="w-full text-xs bg-primary border border-customBorder p-2 rounded focus:outline-none focus:border-accent text-textPrimary placeholder:text-textMuted/40 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-textMuted uppercase block">Programs Video URL</label>
                      <input
                        type="text"
                        value={settings.programsVideoUrl}
                        onChange={(e) => handleCustomUrlChange('programs', e.target.value)}
                        placeholder="e.g. https://domain.com/video3.mp4"
                        className="w-full text-xs bg-primary border border-customBorder p-2 rounded focus:outline-none focus:border-accent text-textPrimary placeholder:text-textMuted/40 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Opacity Control */}
              <div className="space-y-1.5 pt-3.5 border-t border-customBorder">
                <div className="flex justify-between items-center text-[10px] font-mono text-textMuted">
                  <span>AMBIENT SHADE OPACITY</span>
                  <span className="font-bold text-accent">{Math.round(settings.heroOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.45"
                  step="0.01"
                  value={settings.heroOpacity}
                  onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
                  className="w-full h-1 bg-primary border border-customBorder rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
            </div>
          )}

          {/* Footer of panel describing the context */}
          <div className="text-[9px] font-mono text-textMuted mt-4 pt-3 border-t border-customBorder text-center">
            Matched with your physical uploads for premium immersive performance tracking.
          </div>
        </div>
      )}
    </div>
  );
}
