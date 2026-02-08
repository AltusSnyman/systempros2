import { useState, useEffect } from 'react';
import { Play, Pause, Mic } from 'lucide-react';

const SAMPLES = [
    { id: 'roofing', label: 'Roofing', desc: 'Pre-qualification for hail damage inspection.' },
    { id: 'dental', label: 'Dental', desc: 'Appointment rescheduling and hygiene reminders.' },
    { id: 'realestate', label: 'Real Estate', desc: 'Inbound lead qualification for luxury listings.' },
    { id: 'medical', label: 'Medical', desc: 'Patient intake form and insurance verification.' },
];

export default function AudioShowcase() {
    const [activeTab, setActiveTab] = useState(SAMPLES[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [visualizerBars, setVisualizerBars] = useState([]);

    useEffect(() => {
        setVisualizerBars(Array(20).fill(10));
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setVisualizerBars(Array(20).fill(0).map(() => Math.random() * 80 + 10)); // Random height 10-90%
            }, 100);
        } else {
            setVisualizerBars(Array(20).fill(10)); // Reset
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handlePlayToggle = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTabChange = (sample) => {
        setActiveTab(sample);
        setIsPlaying(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-surface/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">

            {/* Header / Tabs */}
            <div className="flex border-b border-white/5 overflow-x-auto scrollbar-hide">
                {SAMPLES.map((sample) => (
                    <button
                        key={sample.id}
                        onClick={() => handleTabChange(sample)}
                        className={`flex-1 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap
              ${activeTab.id === sample.id
                                ? 'bg-white/5 text-white border-b-2 border-accent'
                                : 'text-secondary hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {sample.label}
                    </button>
                ))}
            </div>

            {/* Main Area */}
            <div className="p-8 md:p-12 flex flex-col items-center justify-center relative min-h-[300px]">

                {/* Background Glow */}
                <div className={`absolute inset-0 bg-accent/5 transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>

                <div className="relative z-10 text-center space-y-8 w-full">

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white"><span className="text-gradient">{activeTab.label} Assistant</span></h3>
                        <p className="text-secondary">{activeTab.desc}</p>
                    </div>

                    {/* Visualizer */}
                    <div className="flex items-end justify-center gap-1 h-24 w-full max-w-md mx-auto">
                        {visualizerBars.map((height, i) => (
                            <div
                                key={i}
                                className="w-2 bg-accent rounded-t transition-all duration-100 ease-linear"
                                style={{ height: `${height}%`, opacity: isPlaying ? 1 : 0.3 }}
                            ></div>
                        ))}
                    </div>

                    {/* Controls */}
                    <button
                        onClick={handlePlayToggle}
                        className="mx-auto w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        {isPlaying ? <Pause className="text-black" /> : <Play className="ml-1 text-black" />}
                    </button>

                    <p className="text-xs text-secondary/50 font-mono">
                        {isPlaying ? 'Playing... (Simulation)' : 'Click to Listen'}
                    </p>

                </div>
            </div>
        </div>
    );
}
