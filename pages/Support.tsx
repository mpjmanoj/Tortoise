import React from 'react';

export const Support: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-20 px-6 text-center">
            <div className="max-w-2xl mx-auto">
                <h1 className="font-serif text-6xl text-earth mb-8">Join Us</h1>
                <p className="font-sans text-earth/80 text-xl mb-12">
                    Your support helps us protect nesting grounds and educate the next generation of guardians.
                </p>

                <button className="bg-leaf text-white font-serif text-2xl px-12 py-4 rounded-full shadow-lg hover:shadow-leaf/20 hover:-translate-y-1 transition-all">
                    Donate to the Cause
                </button>
            </div>
        </div>
    );
};
