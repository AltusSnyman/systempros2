import React, { useState, useEffect } from 'react';

import counselingHero from '../assets/counselling_hero_brain.png';
import seniorLivingHero from '../assets/senior_living_hero_tree.png';
import roofingHero from '../assets/roofing_neural.png';
import dentalHero from '../assets/dental_hero_implant.png';
import chiroHero from '../assets/chiropractic_hero_spine.png';
import detailingHero from '../assets/auto_detailing_hero_scanner.png';
import landscapingHero from '../assets/landscaping_hero_plan.png';

const industries = [
    {
        id: 'counseling',
        category: 'Medical',
        title: 'The Empathy Engine',
        stat: 'HIPAA-Compliant Triage & Intake.',
        image: counselingHero.src,
        video: '/assets/industry-videos/counseling.mp4',
        link: '/solutions/counselling'
    },
    {
        id: 'independent-living',
        category: 'Medical',
        title: 'The Community Concierge',
        stat: 'Captures 100% of After-Hours Inquiries.',
        image: seniorLivingHero.src,
        video: '/assets/industry-videos/ndis.mp4',
        link: '/solutions/independent-living'
    },
    {
        id: 'roofing',
        category: 'Home Services',
        title: 'The Storm-Chaser',
        stat: 'Zero Missed Leads During Peak Season.',
        image: roofingHero.src,
        video: '/assets/industry-videos/roofing.mp4',
        link: '/solutions/roofing'
    },
    {
        id: 'dental',
        category: 'Medical',
        title: 'The Practice Filler',
        stat: 'Reduces Front Desk Admin by 70%.',
        image: dentalHero.src,
        video: '/assets/industry-videos/dental.mp4',
        link: '/solutions/dental'
    },
    {
        id: 'chiropractic',
        category: 'Medical',
        title: 'The Patient Intake',
        stat: 'Verifies Insurance & Books Plans of Care.',
        image: chiroHero.src,
        video: '/assets/industry-videos/chiro.mp4',
        link: '/solutions/chiropractors'
    },
    {
        id: 'auto-detailing',
        category: 'Trades',
        title: 'The Ceramic Closer',
        stat: 'Automated Deposit Collection.',
        image: detailingHero.src,
        video: '/assets/industry-videos/detailing.mp4',
        link: '/solutions/auto-detailing'
    },
    {
        id: 'landscaping',
        category: 'Home Services',
        title: 'The Spring Scheduler',
        stat: 'Routes Crews & Books Estimates.',
        image: landscapingHero.src,
        video: '/assets/industry-videos/landscaping.mp4',
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

// Close Icon
const CloseIcon = ({ size, fill }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const VideoModal = ({ videoSrc, onClose }) => {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Close on click outside
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors border border-white/20"
                    aria-label="Close video"
                >
                    <CloseIcon size={24} fill="white" />
                </button>
                <div className="relative aspect-video w-full bg-black">
                    <video
                        src={videoSrc}
                        className="w-full h-full"
                        controls
                        autoPlay
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

export default function IndustriesVault() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeVideo, setActiveVideo] = useState(null);

    const filteredIndustries = activeCategory === 'All'
        ? industries
        : industries.filter(ind => ind.category === activeCategory);

    const openVideo = (videoPath) => {
        setActiveVideo(videoPath);
    };

    const closeVideo = () => {
        setActiveVideo(null);
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
                    let gridClass = "";
                    if (filteredIndustries.length === 7 && index === 6) {
                        gridClass = "md:col-span-2 md:max-w-[50%] md:mx-auto md:w-full lg:col-span-1 lg:max-w-none lg:mx-0 lg:col-start-2";
                    }

                    return (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden rounded-2xl bg-[#121212] border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col ${gridClass}`}
                        >
                            {/* Top Half - Image (Heroic) */}
                            <div className="relative aspect-video w-full overflow-hidden bg-black/50">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90"></div>

                                {/* Play Button Overlay on Image */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => openVideo(item.video)}
                                        className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-600/80 hover:bg-blue-500 text-white backdrop-blur-sm transition-transform hover:scale-110"
                                    >
                                        <PlayIcon size={32} fill="currentColor" />
                                    </button>
                                </div>
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
                                        onClick={() => openVideo(item.video)}
                                        className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all"
                                        aria-label="Play video demo"
                                    >
                                        <PlayIcon size={18} fill="currentColor" />
                                    </button>

                                    <a href={item.link} className="flex-1 block">
                                        <button className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all">
                                            View Blueprint
                                        </button>
                                    </a>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <VideoModal videoSrc={activeVideo} onClose={closeVideo} />
            )}
        </div>
    );
}
