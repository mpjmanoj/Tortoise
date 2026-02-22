import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#FDFCF9] overflow-hidden flex items-center">

      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
          poster="/assets/hero_nest.png"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Soft Vignette Overlay to maintain editorial look and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCF9]/10 via-transparent to-[#FDFCF9]/30" />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Main Content Overlay */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-end text-right min-h-[90vh] justify-start pt-24 md:pt-40">

        {/* Compact Typography Content — Positioned in a clear area */}
        <div
          className={`relative z-20 flex flex-col items-end transition-all duration-1000 delay-300 max-w-lg ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
        >

          <div className="relative mb-4 md:mb-6">
            {/* Focused glow for extreme visibility */}
            <div className="absolute -top-10 -right-10 w-48 md:w-80 h-24 md:h-40 bg-white/10 backdrop-blur-md rounded-full blur-[50px] -z-10" />

            <h1 className="leading-tight select-none text-[#1A1A1A]">
              <span className="block font-serif font-bold text-4xl md:text-5xl tracking-tight drop-shadow-sm">
                The Ancient
              </span>
              <span className="block font-serif italic font-medium text-[#558B2F] text-5xl md:text-6xl tracking-tighter mt-0 md:-mt-1 drop-shadow-sm">
                Voyagers
              </span>
            </h1>
          </div>

          <div className="w-full">
            <p className="font-sans text-stone-800 text-xs md:text-base leading-relaxed mb-8 drop-shadow-sm font-medium bg-white/20 backdrop-blur-[3px] p-4 rounded-lg border border-white/20 shadow-sm">
              The Tortoise, a symbol of wisdom and longevity, needs our help to survive. Join the movement to protect their habitats and ensure these gentle giants remain for generations to come.
            </p>
          </div>


          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 bg-[#558B2F] hover:bg-[#4A7929] text-white font-sans font-bold tracking-widest uppercase text-[9px] md:text-[10px] px-6 md:px-10 py-2.5 md:py-3.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            Begin Journey
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Subtle bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 z-20" />
    </section>
  );
};
