
import React, { useState, useEffect } from 'react';

const ROICalculator = ({
    jobValueLabel = "Average Job Value",
    missedCallsLabel = "Missed Calls Per Week",
    appointmentsLabel = "Appointments Per Month",
    noShowRateLabel = "Current No-Show Rate",
    defaultJobValue = 10000,
    defaultMissedCalls = 5,
    defaultAppointments = 20,
    defaultNoShowRate = 20,
    jobValueMin = 1000,
    jobValueMax = 50000,
    jobValueStep = 500,
    accentColor = "blue" // blue, cyan, green, etc.
}) => {
    // Inputs
    const [jobValue, setJobValue] = useState(defaultJobValue);
    const [missedCalls, setMissedCalls] = useState(defaultMissedCalls);
    const [appointments, setAppointments] = useState(defaultAppointments);
    const [noShowRate, setNoShowRate] = useState(defaultNoShowRate); // Percentage

    // Package Selection
    const [selectedPackage, setSelectedPackage] = useState('toolkit');

    // Constants
    const PRICES = {
        toolkit: 997,
        architecture: 3500 // Using the "From" price as a baseline
    };

    const LABELS = {
        toolkit: 'The Toolkit ($997/mo)',
        architecture: 'Architecture Build ($3,500 One-Time)'
    };

    // Derived Values
    const [results, setResults] = useState({
        monthlyCaptured: 0,
        monthlyNoShow: 0,
        totalMonthlyGain: 0,
        roi: 0,
        annualProjection: 0
    });

    useEffect(() => {
        // Calculations
        // 1. Captured Calls Revenue
        // Logic: Missed Calls/Week * 4.3 weeks * 20% Conversion Rate * Job Value
        const monthlyMissedCalls = missedCalls * 4.3;
        const conversionRate = 0.20; // Conservative estimate
        const capturedRevenue = Math.round(monthlyMissedCalls * conversionRate * jobValue);

        // 2. No-Show Prevention Revenue
        // Logic: Appointments/Month * No-Show Rate * 40% Recovery Rate * Job Value
        const recoveryRate = 0.40; // Conservative estimate for rescheduling/saving
        const noShowRevenue = Math.round(appointments * (noShowRate / 100) * recoveryRate * jobValue);

        // 3. Total & ROI
        const totalGain = capturedRevenue + noShowRevenue;
        const investment = PRICES[selectedPackage];
        const calculatedRoi = Math.round(((totalGain - investment) / investment) * 100);
        const annual = totalGain * 12;

        setResults({
            monthlyCaptured: capturedRevenue,
            monthlyNoShow: noShowRevenue,
            totalMonthlyGain: totalGain,
            roi: calculatedRoi,
            annualProjection: annual
        });

    }, [jobValue, missedCalls, appointments, noShowRate, selectedPackage]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const formatNumber = (val) => {
        return new Intl.NumberFormat('en-US').format(val);
    };

    // Helper to get color classes based on theme
    const getColorClasses = (color) => {
        const colors = {
            blue: {
                text: "text-blue-400",
                accent: "accent-blue-500",
                buttonActive: "bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]",
                cardBorder: "border-blue-500/30",
                bgGradient: "bg-blue-900/10",
                gradientTitle: "from-blue-400 to-cyan-300"
            },
            green: {
                text: "text-green-400",
                accent: "accent-green-500",
                buttonActive: "bg-green-600 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]",
                cardBorder: "border-green-500/30",
                bgGradient: "bg-green-900/10",
                gradientTitle: "from-green-400 to-emerald-300"
            },
            cyan: {
                text: "text-cyan-400",
                accent: "accent-cyan-500",
                buttonActive: "bg-cyan-600 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]",
                cardBorder: "border-cyan-500/30",
                bgGradient: "bg-cyan-900/10",
                gradientTitle: "from-cyan-400 to-blue-300"
            },
            purple: {
                text: "text-purple-400",
                accent: "accent-purple-500",
                buttonActive: "bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]",
                cardBorder: "border-purple-500/30",
                bgGradient: "bg-purple-900/10",
                gradientTitle: "from-purple-400 to-pink-300"
            }
        };
        return colors[color] || colors.blue;
    };

    const theme = getColorClasses(accentColor);


    return (
        <div className={`w-full max-w-5xl mx-auto p-1 rounded-2xl bg-gradient-to-br from-${accentColor}-500/20 via-purple-500/20 to-cyan-500/20`}>
            <div className="bg-[#0A0A0A] rounded-xl p-6 md:p-10 border border-white/10 shadow-2xl backdrop-blur-xl">

                <div className="text-center mb-10">
                    <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.gradientTitle} mb-2`}>
                        Business ROI Calculator
                    </h2>
                    <p className="text-gray-400">Calculate your exact return in 60 seconds</p>
                </div>

                {/* INPUTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">

                    {/* Job Value */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-300">{jobValueLabel}</label>
                            <span className={`text-2xl font-bold ${theme.text}`}>{formatCurrency(jobValue)}</span>
                        </div>
                        <input
                            type="range"
                            min={jobValueMin}
                            max={jobValueMax}
                            step={jobValueStep}
                            value={jobValue}
                            onChange={(e) => setJobValue(parseInt(e.target.value))}
                            className={`w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer ${theme.accent}`}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{formatCurrency(jobValueMin)}</span>
                            <span>{formatCurrency(jobValueMax)}</span>
                        </div>
                    </div>

                    {/* Missed Calls */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-300">{missedCallsLabel}</label>
                            <span className={`text-2xl font-bold ${theme.text}`}>{missedCalls}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={missedCalls}
                            onChange={(e) => setMissedCalls(parseInt(e.target.value))}
                            className={`w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer ${theme.accent}`}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>1</span>
                            <span>100</span>
                        </div>
                    </div>

                    {/* Appointments */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-300">{appointmentsLabel}</label>
                            <span className={`text-2xl font-bold ${theme.text}`}>{appointments}</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="500"
                            step="5"
                            value={appointments}
                            onChange={(e) => setAppointments(parseInt(e.target.value))}
                            className={`w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer ${theme.accent}`}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>5</span>
                            <span>500</span>
                        </div>
                    </div>

                    {/* No-Show Rate */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-bold text-gray-300">{noShowRateLabel}</label>
                            <span className={`text-2xl font-bold ${theme.text}`}>{noShowRate}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="80"
                            step="5"
                            value={noShowRate}
                            onChange={(e) => setNoShowRate(parseInt(e.target.value))}
                            className={`w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer ${theme.accent}`}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>0%</span>
                            <span>80%</span>
                        </div>
                    </div>

                </div>

                {/* PACKAGE SELECTION */}
                <div className="mb-12">
                    <label className="block text-sm font-bold text-gray-300 mb-4">Select Investment Model</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setSelectedPackage('toolkit')}
                            className={`p-4 rounded-lg border transition-all duration-300 text-center font-bold ${selectedPackage === 'toolkit' ? theme.buttonActive : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                            The Toolkit ($997/mo)
                        </button>
                        <button
                            onClick={() => setSelectedPackage('architecture')}
                            className={`p-4 rounded-lg border transition-all duration-300 text-center font-bold ${selectedPackage === 'architecture' ? theme.buttonActive : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                            Architecture Build ($3,500 One-Time)
                        </button>
                    </div>
                </div>

                {/* OUTPUTS DASHBOARD */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Captured Revenue */}
                        <div className="bg-[#111] border border-green-500/20 rounded-xl p-6 relative overflow-hidden group hover:border-green-500/40 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">{formatCurrency(results.monthlyCaptured)}</div>
                            <div className="text-sm text-gray-400">Monthly Revenue from <br /><span className="text-white">Captured Missed Calls</span></div>
                            <div className="text-xs text-gray-600 mt-2">Assumes 20% conversion</div>
                        </div>

                        {/* No-Show Revenue */}
                        <div className="bg-[#111] border border-green-500/20 rounded-xl p-6 relative overflow-hidden group hover:border-green-500/40 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">{formatCurrency(results.monthlyNoShow)}</div>
                            <div className="text-sm text-gray-400">Monthly Revenue from <br /><span className="text-white">Recovered Appointments</span></div>
                            <div className="text-xs text-gray-600 mt-2">Assumes 40% recovery</div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Total Monthly */}
                        <div className={`bg-opacity-10 ${theme.bgGradient} ${theme.cardBorder} border rounded-xl p-6`}>
                            <div className={`text-2xl md:text-3xl font-bold ${theme.text} mb-1`}>{formatCurrency(results.totalMonthlyGain)}</div>
                            <div className="text-xs text-gray-400">Total Monthly Gain</div>
                        </div>

                        {/* Cost */}
                        <div className="bg-orange-900/10 border border-orange-500/30 rounded-xl p-6">
                            <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">{formatCurrency(PRICES[selectedPackage])}</div>
                            <div className="text-xs text-gray-400">Investment Cost</div>
                        </div>

                        {/* ROI % */}
                        <div className="bg-purple-900/10 border border-purple-500/30 rounded-xl p-6">
                            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">{formatNumber(results.roi)}%</div>
                            <div className="text-xs text-gray-400">Return on Investment</div>
                        </div>

                    </div>

                    {/* GRAND TOTAL */}
                    <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-xl p-8 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-2 tracking-tight">
                                {formatCurrency(results.annualProjection)}
                            </div>
                            <div className="text-lg text-blue-200 font-medium">Projected Annual Revenue Increase</div>
                            <div className="text-sm text-blue-400/60 mt-2 font-mono uppercase tracking-widest">SystemPros AI Integration</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};
export default ROICalculator;
