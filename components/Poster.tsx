import React from 'react';
import { UserData } from '../types';

interface PosterProps {
  id?: string;
  userData: UserData;
  className?: string;
}

export const Poster: React.FC<PosterProps> = ({ id, userData, className = '' }) => {
  const name = userData.fullName || 'Guardian';
  const score = userData.score ?? 0;

  return (
    <div
      id={id || 'certificate-visual'}
      className={`relative aspect-[1080/1600] bg-white overflow-hidden text-gray-900 mx-auto shadow-sm ${className}`}
    >
      {/* Layer 1: Background Image */}
      <img
        src="/assets/poster.png"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Certificate background"
      />

      {/* Layer 2: User Photo */}
      <div
        className="absolute rounded-full overflow-hidden z-20 flex items-center justify-center border-[4px] border-white/30 shadow-lg"
        style={{ left: '26.4%', top: '28%', width: '47.2%', aspectRatio: '1/1' }}
      >
        {userData.photo ? (
          <img src={userData.photo} className="w-full h-full object-cover" alt="User photo" />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center text-4xl">📷</div>
        )}
      </div>

      {/* Layer 3: User Name */}
      <div
        className="absolute z-30 flex items-center justify-center w-full"
        style={{ top: '52%', left: 0 }}
      >
        <h2
          className="font-bold tracking-tight text-[#1c1917] text-center px-4"
          style={{
            fontFamily: '"Inter", "Montserrat", sans-serif',
            fontSize: name.length > 20 ? '3rem' : '4rem',
            lineHeight: 1.1,
          }}
        >
          {name}
        </h2>
      </div>

      {/* Layer 4: Score Badge */}
      <div
        className="absolute z-30 flex items-center justify-center w-full"
        style={{ top: '62%', left: 0 }}
      >
        <div className="bg-leaf/10 text-leaf text-sm font-black tracking-widest uppercase border border-leaf/20 rounded-full px-6 py-2">
          Guardian Score: {score} / 20
        </div>


      </div>

      {/* Layer 5: Tricolor stripe at bottom */}
      <div
        className="absolute z-30 w-full"
        style={{ bottom: '2%', height: '3px', left: 0 }}
      >
        <div
          className="w-full h-full opacity-50"
          style={{ background: 'linear-gradient(to right, #FF9933, #FFFFFF, #138808)' }}
        />
      </div>

      {/* Layer 6: School / Org Logo */}
      <div
        className="absolute z-30 flex items-center justify-center"
        style={{ left: '18%', top: '85%', width: '24%', height: '5%' }}
      >
        <img src="/assets/vis_logo.png" className="w-full h-full object-contain" alt="Organization logo" />
      </div>
    </div>
  );
};