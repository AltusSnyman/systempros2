import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic, Activity } from 'lucide-react';

const CHALLENGES = [
    {
        id: 'skeptical',
        label: 'The "Turing Test"',
        sub: 'Objection Handling',
        audio: '/assets/audio/skeptical_lead.mp3', // Placeholder path
        transcript: [
            { time: 0, text: "SystemPros AI: Hi, this is Sarah from SystemPros. I noticed you downloaded our whitepaper on AI integration.", sender: 'ai' },
            { time: 4, text: "Lead: Yeah, look, I'm not interested in talking to a robot. Is this a real person?", sender: 'user' },
            { time: 9, text: "SystemPros AI: I understand the hesitation. I am an AI, but I'm designed to be as helpful strictly for scheduling. I can get a human specialist on the line for you immediately if you prefer?", sender: 'ai' },
            { time: 16, text: "Lead: Oh... wow. You sound pretty real. Okay, well, what's the cost involved?", sender: 'user' },
            { time: 20, text: "SystemPros AI: That depends heavily on your current infrastructure. Our specialists usually do a quick 15-minute audit to give a precise quote. Would you be open to that this Thursday?", sender: 'ai' }
        ]
    },
    {
        id: 'scheduling',
        label: 'Calendar Tetris',
        sub: 'Complex Scheduling',
        audio: '/assets/audio/scheduling_demo.mp3',
        transcript: [
            { time: 0, text: "AI: Good morning, calling to reschedule your dental checkup for Dr. Smith.", sender: 'ai' },
            { time: 4, text: "User: Hi, yeah, I can't do Tuesday anymore. Do you have anything later in the week? Maybe Friday afternoon?", sender: 'user' },
            { time: 10, text: "AI: Let me check Friday for you. I have a 2:30 PM slot open, or a 4:15 PM.", sender: 'ai' },
            { time: 15, text: "User: 4:15 is too late. Anything on Thursday instead? But only after 3 PM.", sender: 'user' },
            { time: 20, text: "AI: Checking Thursday... Yes, I have a 3:45 PM available on Thursday. Shall I lock that in for you?", sender: 'ai' }
        ]
    },
    {
        id: 'support',
        label: 'Tech Support',
        sub: 'Tier 1 Troubleshooting',
        audio: '/assets/audio/support_demo.mp3',
        transcript: [
            { time: 0, text: "AI: Thank you for calling TechNet support. I see you're an existing customer. Are you calling about the outage in your area?", sender: 'ai' },
            { time: 6, text: "User: No, my internet works but my router has a blinking red light.", sender: 'user' },
            { time: 10, text: "AI: I see. A blinking red light usually indicates a synchronization issue. Can you please unplug the power cable for 10 seconds?", sender: 'ai' },
            { time: 17, text: "User: Okay, giving that a try... alright, plugged back in.", sender: 'user' },
            { time: 21, text: "AI: Great. It might take up to 2 minutes to reboot. While we wait, I'm running a remote diagnostic on your line.", sender: 'ai' }
        ]
    }
];

export default function TuringTestChallenge() {
    const [activeTab, setActiveTab] = useState(CHALLENGES[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [visualizerBars, setVisualizerBars] = useState(Array(30).fill(10));
    const transcriptRef = useRef(null);

    // Simulated Visualizer
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setVisualizerBars(Array(30).fill(0).map(() => Math.random() * 90 + 10));
                setCurrentTime(prev => {
                    const nextTime = prev + 0.1;
                    if (nextTime > 25) { // Reset simulation loop
                        setIsPlaying(false);
                        return 0;
                    }
                    return nextTime;
                });
            }, 100);
        } else {
            setVisualizerBars(Array(30).fill(10));
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Auto-scroll transcript
    useEffect(() => {
        if (transcriptRef.current) {
            // Find active message
            const activeMsgIndex = activeTab.transcript.findIndex(m => m.time > currentTime);
            const scrollIndex = activeMsgIndex === -1 ? activeTab.transcript.length - 1 : Math.max(0, activeMsgIndex - 1);
            const messages = transcriptRef.current.children;

            if (messages[scrollIndex]) {
                messages[scrollIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentTime, activeTab]);

    const handleTabChange = (challenge) => {
        setActiveTab(challenge);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    return (
        <div className="w-full max-w-6xl mx-auto rounded-3xl bg-[#0F1115] border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]">

            {/* Left Panel: Controls & Visualizer */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-surface/50 backdrop-blur-md relative border-r border-white/5 flex flex-col justify-between">
                <div>
                    <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hide mb-8">
                        {CHALLENGES.map((challenge) => (
                            <button
                                key={challenge.id}
                                onClick={() => handleTabChange(challenge)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap border
                                ${activeTab.id === challenge.id
                                        ? 'bg-accent/20 border-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                        : 'bg-white/5 border-white/10 text-secondary hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                {challenge.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4 mb-8">
                        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                            {activeTab.sub}
                            {isPlaying && <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
                        </h3>
                        <p className="text-secondary">Listen to how the AI handles complex human nuance, interruptions, and tone shifts.</p>
                    </div>
                </div>

                <div className="py-8">
                    {/* Visualizer */}
                    <div className="flex items-end justify-center gap-1 h-32 w-full mb-8">
                        {visualizerBars.map((height, i) => (
                            <div
                                key={i}
                                className="w-2 bg-gradient-to-t from-accent/50 to-accent rounded-t transition-all duration-100 ease-linear"
                                style={{ height: `${height}%`, opacity: isPlaying ? 1 : 0.3 }}
                            ></div>
                        ))}
                    </div>

                    {/* Play Button */}
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="mx-auto w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)] group"
                    >
                        {isPlaying ? <Pause className="text-black w-8 h-8 fill-current" /> : <Play className="ml-1 text-black w-8 h-8 fill-current group-hover:text-accent transition-colors" />}
                    </button>
                    <div className="text-center mt-4 text-sm font-mono text-accent/80">
                        {isPlaying ? 'AI THINKING...' : 'CLICK TO TEST'}
                    </div>
                </div>
            </div>

            {/* Right Panel: Live Transcript */}
            <div className="w-full md:w-1/2 bg-black/40 p-8 md:p-12 relative flex flex-col">
                <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/5 bg-[#0F1115]/80 backdrop-blur z-10 flex justify-between items-center">
                    <span className="text-xs font-mono text-secondary uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-500" /> Live Transcript
                    </span>
                    <span className="text-xs font-mono text-secondary">Latency: 180ms</span>
                </div>

                <div ref={transcriptRef} className="flex-1 overflow-y-auto space-y-6 pt-16 pb-8 scrollbar-hide mask-gradient">
                    {activeTab.transcript.map((msg, idx) => {
                        const isActive = currentTime >= msg.time;
                        const isFuture = currentTime < msg.time;

                        return (
                            <div
                                key={idx}
                                className={`flex flex-col transition-all duration-500 ${isFuture ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'} ${msg.sender === 'ai' ? 'items-start' : 'items-end'}`}
                            >
                                <span className={`text-[10px] uppercase font-bold mb-1 tracking-wider ${msg.sender === 'ai' ? 'text-accent' : 'text-gray-400'}`}>
                                    {msg.sender === 'ai' ? 'SystemPros AI' : 'Human Lead'}
                                </span>
                                <div className={`p-4 rounded-2xl max-w-[90%] text-sm md:text-base leading-relaxed border ${msg.sender === 'ai'
                                        ? 'bg-accent/10 border-accent/20 text-blue-100 rounded-tl-none'
                                        : 'bg-white/5 border-white/10 text-gray-300 rounded-tr-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    {/* Spacer for scroll */}
                    <div className="h-12"></div>
                </div>

                {/* Overlay gradient for bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F1115] to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
}

// Add CSS for masking the transcript top
// .mask-gradient { mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent); }
