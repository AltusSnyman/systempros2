"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Sparkles as SparklesComp } from "./ui/sparkles";
import { TimelineContent } from "./ui/timeline-animation";
import { VerticalCutReveal } from "./ui/vertical-cut-reveal";
import { cn } from "../lib/utils";
import NumberFlow from "@number-flow/react";

const plans = [
    {
        name: "Starter",
        description: "Great for small businesses looking to get started with AI automation.",
        price: 997,
        yearlyPrice: 9970, // Example yearly pricing logic
        buttonText: "Get Started",
        buttonVariant: "outline",
        includes: [
            "Access to Voice AI Agents",
            "Unlimited CRM Pipeline",
            "Visual Workflow Builder",
            "24/7 Chat Support",
            "Self-Service Configuration"
        ],
    },
    {
        name: "Business",
        description: "Best value for growing businesses that need advanced features.",
        price: 3497,
        yearlyPrice: 34970,
        buttonText: "Get Started",
        buttonVariant: "default",
        popular: true,
        includes: [
            "Everything in Starter, plus:",
            "Advanced Checklists & SOPs",
            "Custom Fields & Logic",
            "Serverless Functions",
            "Priority Email Support"
        ],
    },
    {
        name: "Pro",
        description: "Advanced plan with enhanced security and unlimited access for large teams.",
        price: 5997,
        yearlyPrice: 59970,
        buttonText: "Get Started",
        buttonVariant: "outline",
        includes: [
            "Everything in Business, plus:",
            "3 AI Agents Included",
            "Staff Training Workshop",
            "Dedicated CRM System Implementation",
            "Multi-Staff Access & Permissions",
            "Dedicated Account Manager"
        ],
    },
];

const PricingSwitch = ({ onSwitch }) => {
    const [selected, setSelected] = useState("0");

    const handleSwitch = (value) => {
        setSelected(value);
        onSwitch(value);
    };

    return (
        <div className="flex justify-center mb-10">
            <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
                <button
                    onClick={() => handleSwitch("0")}
                    className={cn(
                        "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors focus:outline-none",
                        selected === "0" ? "text-white" : "text-gray-400"
                    )}
                >
                    {selected === "0" && (
                        <motion.span
                            layoutId="switch"
                            className="absolute inset-0 rounded-full border border-blue-500 bg-gradient-to-t from-blue-600 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    <span className="relative z-20">Monthly</span>
                </button>

                <button
                    onClick={() => handleSwitch("1")}
                    className={cn(
                        "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors focus:outline-none",
                        selected === "1" ? "text-white" : "text-gray-400"
                    )}
                >
                    {selected === "1" && (
                        <motion.span
                            layoutId="switch"
                            className="absolute inset-0 rounded-full border border-blue-500 bg-gradient-to-t from-blue-600 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    <span className="relative z-20 flex items-center gap-2">Yearly <span className="text-[10px] uppercase bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded ml-1">Save 20%</span></span>
                </button>
            </div>
        </div>
    );
};

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);
    const pricingRef = useRef(null);

    const revealVariants = {
        visible: (i) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.2,
                duration: 0.5,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: 20,
            opacity: 0,
        },
    };

    const togglePricingPeriod = (value) =>
        setIsYearly(parseInt(value) === 1);

    return (
        <div
            className="min-h-screen mx-auto relative bg-black overflow-x-hidden py-24"
            ref={pricingRef}
        >
            {/* Background Effects */}
            <div className="absolute top-0 w-full h-96 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a05_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <SparklesComp
                    density={1200}
                    direction="bottom"
                    speed={0.5}
                    color="#4299e1" // Blue-ish sparkles
                    className="absolute inset-x-0 bottom-0 h-full w-full opacity-50 type-mask-radial"
                />
            </div>


            {/* Glowing Orbs */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>


            <div className="text-center mb-16 pt-10 max-w-4xl mx-auto space-y-4 relative z-10 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    <VerticalCutReveal
                        splitBy="words"
                        staggerDuration={0.05}
                        staggerFrom="first"
                        reverse={true}
                        containerClassName="justify-center flex-wrap gap-x-2"
                    >
                        Investment Plans for Every Stage
                    </VerticalCutReveal>
                </h2>

                <TimelineContent
                    as="p"
                    animationNum={0}
                    customVariants={revealVariants}
                    className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Choose the right model for your business velocity. From self-service toolkits to done-for-you enterprise engineering.
                </TimelineContent>

                <TimelineContent
                    as="div"
                    animationNum={1}
                    customVariants={revealVariants}
                >
                    <PricingSwitch onSwitch={togglePricingPeriod} />
                </TimelineContent>
            </div>

            <div className="grid md:grid-cols-3 max-w-7xl gap-6 px-4 mx-auto relative z-10">
                {plans.map((plan, index) => (
                    <TimelineContent
                        key={plan.name}
                        as="div"
                        animationNum={2 + index}
                        customVariants={revealVariants}
                    >
                        <Card
                            className={cn(
                                "relative text-white border-white/10 h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-blue-500/30",
                                plan.popular
                                    ? "bg-[#0A0A0A] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] z-20 border-blue-500/30 scale-105 md:scale-105"
                                    : "bg-[#050505] z-10 hover:bg-[#0A0A0A]"
                            )}
                        >
                            {/* Visual Highlight for Popular Plan */}
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                            )}

                            <CardHeader className="text-left pb-2">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                        {plan.name}
                                    </h3>
                                    {plan.popular && (
                                        <span className="px-3 py-1 text-xs font-bold text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20">
                                            MOST POPULAR
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-baseline mb-2">
                                    <span className="text-5xl font-bold tracking-tight text-white">
                                        $
                                        <NumberFlow
                                            format={{ currency: "USD", style: "decimal", minimumFractionDigits: 0 }}
                                            value={isYearly ? plan.yearlyPrice : plan.price}
                                            className="inline-block"
                                            willChange
                                        />
                                    </span>
                                    <span className="text-gray-400 ml-2 text-sm font-medium uppercase tracking-wider">
                                        /{isYearly ? "year" : "one-time"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 min-h-[40px]">{plan.description}</p>
                            </CardHeader>

                            <CardContent className="pt-6 flex-grow flex flex-col">
                                <a href="/contact" className="block w-full">
                                    <button
                                        className={cn(
                                            "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group",
                                            plan.popular
                                                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                                                : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        {plan.buttonText}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </button>
                                </a>

                                <div className="mt-8 pt-6 border-t border-white/5 space-y-4 flex-grow">
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                        What's Included
                                    </div>
                                    <ul className="space-y-3">
                                        {plan.includes.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(59 130 246)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                </div>
                                                <span className="text-sm text-gray-300 leading-snug">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TimelineContent>
                ))}
            </div>
        </div>
    );
}
