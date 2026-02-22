import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
    onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLogoClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-100' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo - Matches screenshot text logo */}
                    <button
                        onClick={onLogoClick}
                        className="flex items-center gap-2 group"
                    >
                        {/* Small decorative mark like in screenshot */}
                        <div className="w-4 h-4 rounded-sm bg-[#B03A2E] transform rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
                        <span className="font-sans font-bold text-sm tracking-[0.3em] uppercase text-[#3E2723]">
                            TORTOISE<span className="text-[#558B2F]">GUARDIANS</span>
                        </span>

                    </button>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {['Home', 'Our Story', 'Join Us'].map(link => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase().replace(' ', '-')}`}
                                className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-[#3E2723]/60 hover:text-[#558B2F] transition-colors relative group"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#558B2F] group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                        <button className="bg-white border-2 border-[#558B2F]/20 text-[#558B2F] hover:bg-[#558B2F] hover:text-white font-sans font-bold text-[10px] tracking-[0.2em] uppercase px-6 py-2 rounded-lg transition-all shadow-sm">
                            Donate
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-[#3E2723]"
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-[60] bg-[#F9F8F4]/98 backdrop-blur-xl flex flex-col items-center justify-center">
                    <button
                        className="absolute top-6 right-6 text-[#3E2723]"
                        onClick={() => setMobileOpen(false)}
                    >
                        <X size={32} />
                    </button>
                    <nav className="flex flex-col items-center gap-8">
                        {['Home', 'Our Story', 'Join Us'].map(link => (
                            <a
                                key={link}
                                href="#"
                                onClick={() => setMobileOpen(false)}
                                className="font-serif text-5xl text-[#3E2723] hover:text-[#558B2F] transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                        <button className="bg-[#558B2F] text-white font-sans font-bold tracking-widest uppercase px-10 py-4 rounded-full mt-6 text-xl shadow-lg">
                            Donate
                        </button>
                    </nav>
                </div>
            )}
        </>
    );
};
