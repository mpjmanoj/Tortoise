import React from 'react';
import { useSchool } from '../context/SchoolContext';

interface HeaderProps {
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const { school, isSchoolPage } = useSchool();

  return (
    <nav className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 bg-white/70 backdrop-blur-lg border-b border-stone-100/50 supports-[backdrop-filter]:bg-white/50">

      {/* Logo - Clickable to go home */}
      <div
        className="flex items-center gap-3 group cursor-pointer"
        onClick={onLogoClick}
      >
        <span className="font-display font-bold text-xl text-stone-900 tracking-tight group-hover:text-leaf transition-colors">
          Tortoise Guardians 🐢
        </span>

      </div>

      {/* School Name Badge - shown on school-specific pages */}
      {isSchoolPage && school && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-green-50 rounded-full border border-orange-200/50">
          <span className="text-sm font-medium text-stone-700">
            {school.name}
          </span>
        </div>
      )}

    </nav>
  );
};