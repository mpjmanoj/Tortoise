import React from 'react';

export const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-6xl text-earth mb-8">Our Story</h1>
                <div className="prose prose-stone lg:prose-xl font-sans text-earth/80 space-y-6">
                    <p>
                        Tortoises have wandered the Earth for millions of years, outlasting the dinosaurs and witnessing the rise of civilizations.
                        Today, habitat loss and climate change threaten these ancient voyagers.
                    </p>
                    <p>
                        TORTOISE GUARDIANS is a movement dedicated to protecting these resilient reptiles and their fragile Remarkable ecosystems.
                        We provide education, resources, and a community for those who wish to ensure the tortoise continues its long walk through history.
                    </p>

                </div>
            </div>
        </div>
    );
};
