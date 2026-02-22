import React, { useState } from 'react';
import { UserData } from '../types';
import { Poster } from './Poster';
import { Check, Award } from 'lucide-react';

interface CertificatePreviewProps {
  userData: UserData;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  submitError?: string | null;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ userData, onBack, onConfirm, isSubmitting = false, submitError = null }) => {
  const [hovered, setHovered] = useState(false);
  const score = userData.score ?? 0;
  const total = 20;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 80;

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <button onClick={onBack} className="text-earth/60 hover:text-earth font-sans text-sm mb-8 block transition-colors">
          ← Retake Quiz
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — text panel */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-leaf/10 text-leaf rounded-full px-4 py-2 text-xs font-sans font-black tracking-widest uppercase mb-6">
              <Award size={14} /> Assessment Complete
            </div>

            <h2 className="font-serif text-5xl md:text-6xl text-earth leading-tight mb-8">
              Review Your{' '}
              <span className="italic text-leaf">Legacy</span>
            </h2>

            {/* Score card */}
            <div className="bg-white/50 backdrop-blur-sm border border-stone-100 rounded-2xl p-6 mb-8">
              <div className="flex items-end gap-3 mb-4">
                <span className="font-serif text-7xl text-earth font-bold leading-none">{score}</span>
                <span className="font-serif text-3xl text-earth/40 italic mb-2">/ {total}</span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: passed ? '#558B2F' : '#A1887F'
                  }}
                />
              </div>
              <p className="font-serif italic text-earth/70 text-base leading-relaxed">
                {passed
                  ? '"The wisdom of the tortoise marks your journey. The ancient voyagers are safe with you."'
                  : '"Every great guardian starts by listening. Your commitment marks the beginning of a legacy."'}
              </p>
            </div>

            <p className="font-sans text-earth/60 text-sm mb-8 leading-relaxed">
              Ensure your details are correct. This image will serve as your badge of honor in the preservation of these ancient reptiles.
            </p>

            {submitError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl mt-2" role="alert">
                <span>⚠️ {submitError}</span>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 py-4 border-2 border-stone-300 text-earth font-serif text-lg rounded-xl hover:border-earth/50 transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={onConfirm}
                disabled={isSubmitting}
                className="flex-1 py-4 bg-leaf text-white font-serif text-lg rounded-xl shadow-[0_10px_30px_rgba(85,139,47,0.3)] hover:shadow-[0_14px_40px_rgba(85,139,47,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <><span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> Saving…</>
                ) : (
                  <><Check size={20} /> Confirm & Generate</>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT — 3D poster */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="transition-transform duration-700 cursor-pointer"
              style={{
                transform: hovered
                  ? 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
                  : 'perspective(1000px) rotateY(-6deg) rotateX(2deg)',
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* Dark frame */}
              <div className="bg-stone-900 p-1 rounded-sm shadow-2xl">
                <div className="relative w-[320px] md:w-[380px] overflow-hidden rounded-sm">
                  {/* Shine overlay */}
                  <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                  <Poster userData={userData} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};