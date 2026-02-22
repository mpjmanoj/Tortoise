import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, CheckCircle2, XCircle, AlertTriangle, ExternalLink, Flame, Shovel } from 'lucide-react';

const FAQS = [
    {
        question: "What should we do if the flag accidentally touches the ground?",
        answer: "Do not panic. Simply pick it up respectfully, check it for damage, and if it is still in good condition, it can continue to be displayed."
    },
    {
        question: "Can we hoist the flag on rainy days?",
        answer: "It is better to avoid hoisting the flag during heavy rain to prevent damage. If the flag is already displayed, bring it down safely."
    },
    {
        question: "Can students take photos with the flag?",
        answer: "Yes, as long as the flag is displayed respectfully and the photos do not mock or insult the flag."
    }
];

const REFERENCES = [
    {
        title: "Flag Code of India, 2002 (as amended in 2021 & 2022)",
        source: "Ministry of Home Affairs (MHA)",
        description: "Full official rules for the design, display, use, and care of the Indian flag.",
        link: "https://www.mha.gov.in/sites/default/files/FlagCode_18072023_0.pdf"
    },
    {
        title: "Frequently Asked Questions (FAQs) – Indian National Flag",
        source: "Ministry of Home Affairs (MHA)",
        description: "Official Q&A on flag materials, sizes, display, and citizen use.",
        link: "https://www.mha.gov.in/sites/default/files/FAQ_18072023.pdf"
    },
    {
        title: "Salient features of the Flag Code of India, 2002",
        source: "Press Information Bureau (PIB)",
        description: "Short summary of key rules and practices.",
        link: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1849012"
    },
    {
        title: "Prevention of Insults to National Honour Act, 1971",
        source: "Ministry of Home Affairs (MHA)",
        description: "Law defining criminal offences related to disrespect of the national flag, Constitution, and anthem.",
        link: "https://www.mha.gov.in/sites/default/files/Prevention_Insults_National_Honour_Act1971_1.pdf"
    },
    {
        title: "National Flag, Emblem & Anthem – Document Hub",
        source: "Ministry of Home Affairs (MHA)",
        description: "Central government page listing all official documents, circulars, and orders on the Indian flag.",
        link: "https://www.mha.gov.in/en/documents/national-flag-emblem-anthem"
    },
    {
        title: "Frequently Asked Questions – Har Ghar Tiranga",
        source: "PIB / Ministry of Culture",
        description: "Citizen-friendly FAQ booklet on hoisting the Indian flag at home.",
        link: "https://amritmahotsav.nic.in/har-ghar-tiranga.htm"
    },
    {
        title: "FAQ Booklet – Flag Code of India and its FAQ",
        source: "CG Publications",
        description: "Comprehensive FAQ document combining Flag Code rules and citizen questions.",
        link: "https://www.cgpublication.com/page/flag-code-of-india-2002"
    },
    {
        title: "Wikipedia – Flag Code of India",
        source: "Wikipedia",
        description: "Neutral, detailed overview of the Flag Code history and provisions.",
        link: "https://en.wikipedia.org/wiki/Flag_Code_of_India"
    }
];

export const FlagCode: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-20 px-4 scroll-mt-20" id="flag-code">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-6">
                        <BookOpen className="text-orange-600" size={32} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-6 tracking-tight">
                        Indian Flag: Code of Conduct
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 mx-auto rounded-full mb-8 border border-stone-200"></div>

                    <div className="bg-stone-50 rounded-3xl p-8 md:p-10 shadow-sm border border-stone-100 text-left max-w-4xl mx-auto">
                        <p className="text-lg text-stone-700 leading-relaxed mb-6">
                            The Indian flag is governed by the <strong>Flag Code of India, 2002</strong> and the <strong>Prevention of Insults to National Honour Act, 1971</strong>.
                        </p>
                        <p className="text-lg text-stone-700 leading-relaxed">
                            This section provides complete guidance on how to properly use, respect, store, and dispose of the Indian flag.
                        </p>
                    </div>
                </div>

                {/* 1. Design & Specification */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">1</span>
                        The Indian Flag: Design & Specification
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Official Design */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg mb-3 text-stone-800">Official Design</h4>
                            <p className="text-stone-600 mb-4">Three equal horizontal bands:</p>
                            <div className="space-y-2 font-medium">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Saffron (Top)</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-white border border-stone-200"></span> White (Middle)</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-600"></span> Green (Bottom)</div>
                            </div>
                            <p className="text-sm text-stone-500 mt-4">With <strong>Ashoka Chakra</strong> (Navy Blue, 24 spokes) in the center.</p>
                        </div>

                        {/* Correct Ratio */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg mb-3 text-stone-800">Correct Ratio</h4>
                            <div className="text-4xl font-black text-stone-200 mb-2">3:2</div>
                            <p className="text-stone-600 font-medium">Length to Width Ratio</p>
                            <ul className="text-sm text-stone-500 mt-4 space-y-1 list-disc list-inside">
                                <li>90cm × 60cm</li>
                                <li>60cm × 40cm</li>
                                <li>30cm × 20cm</li>
                            </ul>
                        </div>

                        {/* Materials */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-lg mb-3 text-stone-800">Permitted Materials</h4>
                            <p className="text-stone-600 mb-3">Natural or semi-natural fibres only:</p>
                            <div className="flex flex-wrap gap-2">
                                {['Cotton', 'Polyester', 'Wool', 'Silk', 'Khadi'].map(m => (
                                    <span key={m} className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600">{m}</span>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center gap-2 text-red-600 text-sm font-bold">
                                <XCircle size={16} /> NO Plastic Flags
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. How to Use */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">2</span>
                        How to use the Indian flag
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* DOs */}
                        <div className="bg-green-50/50 rounded-2xl p-8 border border-green-100">
                            <div className="flex items-center gap-2 mb-6 text-green-700 font-bold text-lg tracking-wide uppercase">
                                <CheckCircle2 size={24} /> Do's
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Hoist with saffron band always on top.",
                                    "Display in a position of prominence and respect.",
                                    "Ensure flag is clean, bright, and undamaged.",
                                    "Fly upright and fully unfurled.",
                                    "Use a proper flag staff or stand."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-stone-700">
                                        <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* DON'Ts */}
                        <div className="bg-red-50/50 rounded-2xl p-8 border border-red-100">
                            <div className="flex items-center gap-2 mb-6 text-red-700 font-bold text-lg tracking-wide uppercase">
                                <XCircle size={24} /> Don'ts
                            </div>
                            <ul className="space-y-4">
                                {[
                                    "Don't display torn, faded, or damaged flags.",
                                    "Don't fly on the same pole as another flag.",
                                    "Don't place anything above or in front of the flag.",
                                    "Don't use covering for stages, podiums, or vehicles."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-stone-700">
                                        <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3. Respect & Handling */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">3</span>
                        How to respect the Indian flag
                    </h3>

                    <div className="bg-stone-50 rounded-3xl p-8 md:p-10 border border-stone-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="font-bold text-lg mb-4 text-stone-800">Proper Care</h4>
                                <ul className="space-y-3 text-stone-600">
                                    <li className="flex gap-3"><span className="text-green-600">✓</span> Handle with clean hands and respect.</li>
                                    <li className="flex gap-3"><span className="text-green-600">✓</span> Never let it touch ground, floor, or water.</li>
                                    <li className="flex gap-3"><span className="text-green-600">✓</span> Fold properly using official method.</li>
                                    <li className="flex gap-3"><span className="text-green-600">✓</span> Keep paper/cloth flags safe; don't leave lying around.</li>
                                    <li className="flex gap-3"><span className="text-green-600">✓</span> Collect and store flags after events.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-4 text-stone-800">Avoid Disrespect</h4>
                                <ul className="space-y-3 text-stone-600">
                                    <li className="flex gap-3"><span className="text-red-500">✗</span> Don't print words, logos, or images on the flag.</li>
                                    <li className="flex gap-3"><span className="text-red-500">✗</span> Don't write or stick anything on the flag.</li>
                                    <li className="flex gap-3"><span className="text-red-500">✗</span> Don't use as clothing, costume, or accessory.</li>
                                    <li className="flex gap-3"><span className="text-red-500">✗</span> Don't use as cushion, napkin, or decor.</li>
                                    <li className="flex gap-3"><span className="text-red-500">✗</span> Don't use for commercial ads or branding.</li>
                                    <li className="flex gap-3"><span className="text-red-500">✗</span> Don't use on private vehicles without permission.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-stone-200">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="text-orange-500 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide mb-1">Please Note</h4>
                                    <p className="text-stone-600 text-sm mb-3">
                                        Under the <strong>Prevention of Insults to National Honour Act, 1971</strong>, intentional disrespect (burning, defacing, etc.) in public is a criminal offence punishable by up to 3 years imprisonment, a fine, or both. Please ensure:
                                    </p>
                                    <ul className="text-stone-600 text-sm space-y-1 list-disc list-inside">
                                        <li>Do not burn, crush, or damage the flag.</li>
                                        <li>Do not use the flag to insult the nation.</li>
                                        <li>Do not show disrespect in word or action.</li>
                                        <li>Do not display the flag in an undignified manner.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. How to Fold */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">4</span>
                        How to Fold the National Flag
                    </h3>
                    <p className="text-stone-600 mb-6">To fold the flag respectfully for storage, follow the 3-step official protocol:</p>
                    <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="font-bold text-stone-400">01</div>
                                <div>
                                    <h4 className="font-bold text-stone-800">Horizontal Placement</h4>
                                    <p className="text-stone-600">Place the flag horizontally on a clean surface.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="font-bold text-stone-400">02</div>
                                <div>
                                    <h4 className="font-bold text-stone-800">Base Fold</h4>
                                    <p className="text-stone-600">Fold the Saffron and Green bands beneath the White band simultaneously.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="font-bold text-stone-400">03</div>
                                <div>
                                    <h4 className="font-bold text-stone-800">Final Fold</h4>
                                    <p className="text-stone-600">Fold the White band from left and right towards the center so only the Chakra is visible.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Disposal */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">6</span>
                        How to dispose of a damaged flag
                    </h3>
                    <p className="text-stone-600 mb-8 max-w-3xl">
                        Dispose only when ripped, soiled, faded, or not suitable for display.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Burning */}
                        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex flex-col">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                                <Flame size={24} />
                            </div>
                            <h4 className="font-bold text-lg text-stone-900 mb-2">Method 1: Respectful Burning</h4>
                            <p className="text-sm text-stone-500 font-medium mb-4 uppercase tracking-wider">Preferred Method</p>
                            <ol className="list-decimal list-inside space-y-2 text-stone-700 text-sm flex-1">
                                <li>Fold the flag neatly.</li>
                                <li>Build a fire in a valid, private place.</li>
                                <li>Place folded flag in the centre of flames.</li>
                                <li>Observe silence while it burns completely.</li>
                            </ol>
                        </div>

                        {/* Burial */}
                        <div className="bg-stone-100 rounded-2xl p-6 border border-stone-200 flex flex-col">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-stone-600">
                                <Shovel size={24} />
                            </div>
                            <h4 className="font-bold text-lg text-stone-900 mb-2">Method 2: Respectful Burial</h4>
                            <p className="text-sm text-stone-500 font-medium mb-4 uppercase tracking-wider">Alternative Method</p>
                            <ol className="list-decimal list-inside space-y-2 text-stone-700 text-sm flex-1">
                                <li>Fold the flag neatly.</li>
                                <li>Place in a wooden box or clean cloth.</li>
                                <li>Bury in a clean, private location.</li>
                                <li>Maintain silence during the process.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 mt-6 text-center">
                        <h4 className="font-bold text-red-700 text-sm uppercase mb-1">What NOT to do</h4>
                        <p className="text-red-600 font-medium text-sm">
                            Never throw in dustbins/trash. Never leave on streets or playgrounds. Never tear into pieces before disposal (burn/bury as a whole).
                        </p>
                    </div>
                </div>

                {/* 6. Schools */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">6</span>
                        How Schools Can Participate
                    </h3>
                    <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                                    <p className="text-stone-300"><strong>Hoist the Flag</strong> on a dedicated flagpole with ceremony.</p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                                    <p className="text-stone-300"><strong>Teach Students</strong> the Flag Code and etiquette.</p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                                    <p className="text-stone-300"><strong>Create Pledge Posters</strong> using this tool.</p>
                                </li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                                    <p className="text-stone-300"><strong>Collect Damaged Flags</strong> after events for respectful disposal.</p>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold mt-0.5">5</div>
                                    <p className="text-stone-300"><strong>Organise Awareness</strong> sessions for students and parents.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 7. FAQs (Moved as per guide) */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">7</span>
                        <h3 className="text-2xl font-bold text-stone-900">Frequently Asked Questions</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {FAQS.map((faq, index) => (
                            <div
                                key={index}
                                className={`border border-stone-200 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-stone-50 shadow-md border-stone-300' : 'bg-white hover:border-stone-300'}`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                >
                                    <span className={`font-semibold text-lg ${openIndex === index ? 'text-blue-700' : 'text-stone-800'}`}>
                                        {faq.question}
                                    </span>
                                    {openIndex === index ? (
                                        <ChevronUp className="text-blue-600 shrink-0 ml-4" size={20} />
                                    ) : (
                                        <ChevronDown className="text-stone-400 shrink-0 ml-4" size={20} />
                                    )}
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-5 pt-0 text-stone-600 leading-relaxed border-t border-stone-200/50 mt-2">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. References */}
                <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">8</span>
                        Official References
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {REFERENCES.map((ref, i) => (
                            <a
                                key={i}
                                href={ref.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col p-5 rounded-xl border border-stone-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all group h-full"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider bg-stone-100 px-2 py-1 rounded-md group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                        {ref.source}
                                    </div>
                                    <ExternalLink size={16} className="text-stone-300 group-hover:text-blue-500" />
                                </div>

                                <h4 className="font-bold text-stone-900 group-hover:text-blue-700 mb-2 leading-tight">
                                    {ref.title}
                                </h4>

                                <p className="text-sm text-stone-500 leading-relaxed mt-auto">
                                    {ref.description}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </section >
    );
};
