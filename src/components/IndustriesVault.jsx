import React, { useState, useRef } from 'react';

const industries = [
    {
        id: 'counseling',
        category: 'Medical',
        title: 'The Empathy Engine',
        stat: 'HIPAA-Compliant Triage & Intake.',
        image: '/assets/counselling_hero_brain.png',
        audio: '/assets/industry-videos/counseling_demo.mp3',
        link: '/solutions/counselling'
    },
    {
        id: 'independent-living',
        category: 'Medical',
        title: 'The Community Concierge',
        stat: 'Captures 100% of After-Hours Inquiries.',
        image: '/assets/senior_living_hero_tree.png',
        audio: '/assets/industry-videos/senior_living_demo.mp3',
        link: '/solutions/independent-living'
    },
    {
        id: 'roofing',
        category: 'Home Services',
        title: 'The Storm-Chaser',
        stat: 'Zero Missed Leads During Peak Season.',
        image: '/assets/roofing_neural.png',
        audio: '/assets/industry-videos/roofing_demo.mp3',
        link: '/solutions/roofing'
    },
    {
        id: 'dental',
        category: 'Medical',
        title: 'The Practice Filler',
        stat: 'Reduces Front Desk Admin by 70%.',
        image: '/assets/dental_hero_implant.png',
        audio: '/assets/industry-videos/dental_demo.mp3',
        link: '/solutions/dental'
    },
    {
        id: 'chiropractic',
        category: 'Medical',
        title: 'The Patient Intake',
        stat: 'Verifies Insurance & Books Plans of Care.',
        image: '/assets/chiropractic_hero_spine.png',
        audio: '/assets/industry-videos/chiro_demo.mp3',
        link: '/solutions/chiropractors'
    },
    {
        id: 'auto-detailing',
        category: 'Trades',
        title: 'The Ceramic Closer',
        stat: 'Automated Deposit Collection.',
        image: '/assets/auto_detailing_hero_scanner.png',
        audio: '/assets/industry-videos/detailing_demo.mp3',
        link: '/solutions/auto-detailing'
    },
    {
        id: 'landscaping',
        category: 'Home Services',
        title: 'The Spring Scheduler',
        stat: 'Routes Crews & Books Estimates.',
        image: '/assets/landscaping_hero_plan.png',
        audio: '/assets/industry-videos/landscaping_demo.mp3',
        link: '/solutions/landscaping'
    }
];

const categories = ['All', 'Home Services', 'Medical', 'Trades'];

// Simple Play Icon Component for inline use
const PlayIcon = ({ size, fill }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7z" />
    </svg>
);
// Pause Icon
const PauseIcon = ({ size, fill }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

export default function IndustriesVault() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [playingId, setPlayingId] = useState(null);
    const audioRefs = useRef({});

    // Logic to ensure the last item is handled gracefully in grid
    // We only need special logic if we are showing ALL items and there are 7.
    const filteredIndustries = activeCategory === 'All'
        ? industries
        : industries.filter(ind => ind.category === activeCategory);

    const togglePlay = (id) => {
        if (playingId && playingId !== id) {
            if (audioRefs.current[playingId]) {
                audioRefs.current[playingId].pause();
            }
        }
        const audio = audioRefs.current[id];
        if (audio) {
            if (audio.paused) {
                audio.play().catch(e => console.error("Playback failed", e));
                setPlayingId(id);
            } else {
                audio.pause();
                setPlayingId(null);
            }
        }
    };

    const handleEnded = () => {
        setPlayingId(null);
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${activeCategory === cat
                            ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                            : 'bg-white/5 border-white/10 text-secondary hover:bg-white/10 hover:border-white/20'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 content-center place-items-stretch">
                {filteredIndustries.map((item, index) => {
                    // Logic to center the last item if it's the 7th item in the list of ALL
                    // AND we are currently viewing 'All' (length 7)
                    // If viewing filtered, standard grid apply.
                    const isLastItemODD = filteredIndustries.length % 2 !== 0 && index === filteredIndustries.length - 1;
                    const isLastItemGrid3 = filteredIndustries.length % 3 === 1 && index === filteredIndustries.length - 1;

                    // Simple heuristic: if it's the last item and we have an odd number (7), let's span differently?
                    // The prompt asked for "last item centered or spanning".
                    // Tailwind arbitrary classes allow specific col placement.

                    let gridClass = "";
                    if (filteredIndustries.length === 7 && index === 6) {
                        // On LG (3 cols), it's on a new row alone. Center it: col-start-2
                        // On MD (2 cols), it's on a new row alone (since 7 is odd). Span full: col-span-2
                        gridClass = "md:col-span-2 md:max-w-[50%] md:mx-auto md:w-full lg:col-span-1 lg:max-w-none lg:mx-0 lg:col-start-2";
                    }

                    return (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden rounded-2xl bg-[#121212] border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col ${gridClass}`}
                        >
                            {/* Top Half - Image (Heroic) - 50% height equivalent via aspect ratio or fixed height */}
                            <div className="relative aspect-video w-full overflow-hidden bg-black/50">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90"></div>
                            </div>

                            {/* Bottom Half - Content */}
                            <div className="p-6 relative z-10 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                    <p className="text-sm font-mono text-cyan-300">{item.stat}</p>
                                </div>

                                <div className="mt-auto flex items-center justify-between gap-4">
                                    <button
                                        onClick={() => togglePlay(item.id)}
                                        className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all"
                                    >
                                        {playingId === item.id ? (
                                            <PauseIcon size={18} fill="currentColor" />
                                        ) : (
                                            <PlayIcon size={18} fill="currentColor" />
                                        )}
                                    </button>

                                    <a href={item.link} className="flex-1 block">
                                        <button className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all">
                                            View Blueprint
                                        </button>
                                    </a>

                                    {/* Hidden Audio */}
                                    <audio
                                        ref={el => audioRefs.current[item.id] = el}
                                        src={item.audio}
                                        onEnded={handleEnded}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}

