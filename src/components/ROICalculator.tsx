import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function ROICalculator() {
    const [callsPerDay, setCallsPerDay] = useState(30);
    const [avgDuration, setAvgDuration] = useState(5); // minutes
    const [hourlyRate, setHourlyRate] = useState(28); // NZD
    const [currency, setCurrency] = useState('NZD');

    const [monthlySavings, setMonthlySavings] = useState(0);
    const [yearlySavings, setYearlySavings] = useState(0);
    const [humanCost, setHumanCost] = useState(0);
    const [aiCost, setAiCost] = useState(0);

    // Assumptions
    const DAYS_PER_MONTH = 22; // Business days
    const AI_COST_PER_MINUTE = 0.50; // Estimated AI cost/min (illustrative)
    const HUMAN_EFFICIENCY = 0.75; // Humans aren't 100% productive
    const OVERHEAD_MULTIPLIER = 1.2; // Kiwisaver, ACC, sick leave, etc.

    useEffect(() => {
        // Human Cost Calculation
        // Total minutes * (Hourly Rate / 60) * Overhead
        const dailyMinutes = callsPerDay * avgDuration;
        const dailyHumanCost = (dailyMinutes / 60) * hourlyRate * OVERHEAD_MULTIPLIER;
        const monthlyHuman = dailyHumanCost * DAYS_PER_MONTH;

        // AI Cost Calculation
        // Total minutes * AI Rate
        const dailyAiCost = dailyMinutes * AI_COST_PER_MINUTE;
        const monthlyAi = dailyAiCost * DAYS_PER_MONTH; // AI works weekends too, but comparing business hours for fairness

        setHumanCost(Math.round(monthlyHuman));
        setAiCost(Math.round(monthlyAi));
        setMonthlySavings(Math.round(monthlyHuman - monthlyAi));
        setYearlySavings(Math.round((monthlyHuman - monthlyAi) * 12));
    }, [callsPerDay, avgDuration, hourlyRate]);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
            <div className="text-center mb-10">
                <h3 className="text-3xl font-bold flex items-center justify-center gap-3 mb-2">
                    <Calculator className="w-8 h-8 text-accent" />
                    <span className="text-white">Calculate Your KPI Savings</span>
                </h3>
                <p className="text-secondary">See how much you could save by switching to SystemPros Voice AI.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Inbound Calls Per Day</label>
                        <input
                            type="range"
                            min="5"
                            max="200"
                            value={callsPerDay}
                            onChange={(e) => setCallsPerDay(Number(e.target.value))}
                            className="w-full accent-accent h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-white font-mono bg-white/5 p-2 rounded">
                            <span>{callsPerDay} calls</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Avg. Call Duration (Minutes)</label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={avgDuration}
                            onChange={(e) => setAvgDuration(Number(e.target.value))}
                            className="w-full accent-accent h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-white font-mono bg-white/5 p-2 rounded">
                            <span>{avgDuration} mins</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-secondary">Staff Hourly Rate ({currency})</label>
                        <input
                            type="range"
                            min="23" // Minimum wage approx
                            max="60"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                            className="w-full accent-accent h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-white font-mono bg-white/5 p-2 rounded">
                            <span>${hourlyRate} / hr</span>
                        </div>
                        <p className="text-xs text-secondary/60 italic">*Includes estimated overheads (ACC, KiwiSaver)</p>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                            <span className="text-secondary">Current Monthly Cost</span>
                            <span className="text-xl font-mono text-white">${humanCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                            <span className="text-secondary">Predicted AI Cost</span>
                            <span className="text-xl font-mono text-accent">${aiCost.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-lg text-secondary mb-2 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            Projected Annual Savings
                        </h4>
                        <motion.div
                            key={yearlySavings}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-mono tracking-tight"
                        >
                            ${yearlySavings.toLocaleString()}
                        </motion.div>
                        <p className="text-sm text-secondary mt-4">
                            That's enough to hire <span className="text-white font-bold">{Math.floor(yearlySavings / 70000)}</span> more senior sales reps.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
