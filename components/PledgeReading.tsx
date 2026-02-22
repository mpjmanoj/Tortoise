import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UserData } from '../types';
import { ArrowRight, ShieldAlert, Play, BookOpen } from 'lucide-react';

interface PledgeReadingProps {
  userData: UserData;
  onBack: () => void;
  onConfirm: () => void;
}

// Tortoise conservation commitments for the user to acknowledge

const TORTOISE_COMMITMENTS = [
  "I will provide a safe, quiet space in my garden or locality for tortoises to rest and forage.",
  "I will ensure there is always access to clean, shallow water for tortoises to drink and soak in.",
  "I will plant native vegetation and avoid using harmful pesticides that could poison a tortoise's natural food source.",
  "I will educate my neighbors and friends about the importance of protecting tortoises and their habitats.",
  "I will never disturb a tortoise while it is nesting or hibernating, ensuring they can complete their natural cycles.",
  "I will report any injured or misplaced tortoises to a local wildlife conservation group immediately.",
  "I will discourage the removal of tortoises from their wild habitats for use as pets.",
  "I will create 'wildlife corridors' by leaving small gaps in fences to allow tortoises to move freely between gardens.",
  "I will be mindful of tortoises when using garden machinery like lawnmowers or strimmers.",
  "I commit to being a guardian of the tortoise — by action, protecting these ancient voyagers for years to come."
];


export const PledgeReading: React.FC<PledgeReadingProps> = ({ userData, onBack, onConfirm }) => {
  // Store checked state for each point by index
  const [checkedPoints, setCheckedPoints] = useState<number[]>([]);

  const togglePoint = (index: number) => {
    if (checkedPoints.includes(index)) {
      setCheckedPoints(checkedPoints.filter(i => i !== index));
    } else {
      setCheckedPoints([...checkedPoints, index]);
    }
  };

  const handleSelectAll = () => {
    if (checkedPoints.length === TORTOISE_COMMITMENTS.length) {
      setCheckedPoints([]);
    } else {
      setCheckedPoints(TORTOISE_COMMITMENTS.map((_, i) => i));
    }
  };


  const allChecked = checkedPoints.length === TORTOISE_COMMITMENTS.length;

  return (
    <div className="min-h-screen bg-canvas pt-20 pb-0 flex flex-col">
      {/* Top Bar */}
      <div className="px-4 mb-4 max-w-lg mx-auto w-full">
        <button onClick={onBack} className="text-stone-500 hover:text-stone-800 font-medium mb-4 block">
          ← Back to Preview
        </button>
        <h2 className="text-2xl font-display font-bold text-indiaNavy">Tortoise Guardian Commitments</h2>
        <p className="text-sm text-stone-500 mt-1">Acknowledge each commitment to continue.</p>
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] overflow-hidden relative max-w-lg mx-auto w-full border border-stone-100 flex flex-col">

        {/* Header decoration */}
        <div className="h-2 w-full bg-gradient-to-r from-saffron via-white to-indiaGreen" />

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 pb-40">

          {/* The Pledge Points */}
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-indiaNavy" />
                <h3 className="font-display font-bold text-lg text-indiaNavy">My Commitments</h3>
              </div>
              <button
                onClick={handleSelectAll}
                className="text-xs font-bold text-saffron hover:text-orange-700 uppercase tracking-wide"
              >
                {allChecked ? 'Unselect All' : 'Select All'}
              </button>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 space-y-3">
              {TORTOISE_COMMITMENTS.map((point, index) => {
                const isChecked = checkedPoints.includes(index);
                return (
                  <div
                    key={index}
                    onClick={() => togglePoint(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        togglePoint(index);
                      }
                    }}
                    tabIndex={0}
                    role="checkbox"
                    aria-checked={isChecked}
                    aria-label={`Commitment ${index + 1}: ${point}`}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-saffron/30 ${isChecked
                      ? 'bg-white border-saffron/20 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-stone-100'
                      }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${isChecked
                      ? 'bg-saffron border-saffron'
                      : 'bg-white border-stone-300'
                      }`}>
                      {isChecked && <CheckIcon />}
                    </div>
                    <p className={`text-sm leading-relaxed ${isChecked ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>
                      {point}
                    </p>
                  </div>
                );
              })}
            </div>

          </section>
        </div>

        {/* Bottom Floating Action */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-stone-100 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-20">
          <button
            onClick={onConfirm}
            disabled={!allChecked}
            aria-label="Become a Tortoise Guardian (all commitments must be selected)"
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all focus:outline-none ${allChecked
              ? 'bg-gradient-to-r from-saffron to-[#f97316] text-white shadow-lg shadow-saffron/20 hover:-translate-y-1 focus:ring-2 focus:ring-saffron/30'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
          >
            Become a Guardian 🐢
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
