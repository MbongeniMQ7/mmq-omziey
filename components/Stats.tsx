import React, { useEffect, useState, useRef } from 'react';

interface CountUpProp {
  target: number;
  suffix?: string;
  decimals?: number;
}

function CountUp({ target, suffix = '', decimals = 0 }: CountUpProp) {
  const [val, setVal] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const duration = 1500; // 1.5 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // East out formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * target;

      setVal(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, target]);

  return (
    <div ref={elementRef} className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-accent tracking-wider uppercase leading-none">
      {val.toFixed(decimals)}
      {suffix}
    </div>
  );
}

export default function Stats() {
  const statsList = [
    {
      targetNum: 8,
      suffix: '+',
      label: 'Clients Trained',
      sublabel: 'Real results, real people',
      decimals: 0
    },
    {
      targetNum: 4.9,
      suffix: ' / 5',
      label: 'Avg Rating',
      sublabel: 'Verified client feedback',
      decimals: 1
    },
    {
      targetNum: 2,
      suffix: ' Years',
      label: 'Active Coaching',
      sublabel: 'Science-backed results',
      decimals: 0
    },
    {
      targetNum: 1,
      suffix: ' Location',
      label: 'Boutique Hub',
      sublabel: 'Elite training space',
      decimals: 0
    }
  ];

  return (
    <section id="stats-section" className="bg-white border-y border-customBorder py-12 md:py-16 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y divide-customBorder lg:divide-y-0 lg:divide-x divide-solid">
          {statsList.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left ${
                index > 0 ? 'pt-6 lg:pt-0 lg:pl-10' : 'lg:pr-10'
              }`}
            >
              {/* Dynamic Animated Value */}
              <CountUp target={stat.targetNum} suffix={stat.suffix} decimals={stat.decimals} />
              
              {/* Labels */}
              <div className="mt-2.5">
                <span className="block text-sm md:text-base font-bold text-textPrimary tracking-wide uppercase">
                  {stat.label}
                </span>
                <span className="block text-xs text-textMuted font-sans mt-0.5">
                  {stat.sublabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
