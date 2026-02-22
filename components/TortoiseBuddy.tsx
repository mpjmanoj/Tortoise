import React from 'react';
import { Turtle } from 'lucide-react';

interface TortoiseBuddyProps {
    mood: 'neutral' | 'happy' | 'sad';
}

export const TortoiseBuddy: React.FC<TortoiseBuddyProps> = ({ mood }) => {
    const moodConfig = {
        neutral: {
            color: 'text-stone-300',
            animation: '',
            glow: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
            emoji: null,
        },
        happy: {
            color: 'text-emerald-400',
            animation: 'animate-bounce',
            glow: 'drop-shadow(0 0 12px rgba(52,211,153,0.6))',
            emoji: '🥗',
        },
        sad: {
            color: 'text-red-400',
            animation: 'animate-pulse',
            glow: 'drop-shadow(0 0 12px rgba(248,113,113,0.4)) grayscale(0.3)',
            emoji: null,
        },
    };

    const cfg = moodConfig[mood];

    return (
        <div className="fixed top-4 right-4 z-50 pointer-events-none select-none">
            {/* Ground/Perch */}
            <div className="absolute top-8 right-0 flex flex-col gap-[3px]">
                <div className="w-20 h-[5px] bg-green-900/40 rounded-full" />
                <div className="w-14 h-[4px] bg-green-800/30 rounded-full ml-2 mt-1" />
            </div>


            {/* Mood emoji above */}
            {cfg.emoji && (
                <div className="absolute -top-4 right-6 text-2xl animate-bounce">{cfg.emoji}</div>
            )}

            {/* Tortoise (Turtle icon) */}
            <div
                className={`${cfg.color} ${cfg.animation} transition-all duration-500`}
                style={{ filter: cfg.glow }}
            >
                <Turtle size={80} strokeWidth={1.5} />
            </div>

            {/* Flower decoration */}
            <div className="absolute -top-1 right-2 text-base opacity-60">🌼</div>
        </div>
    );
};
