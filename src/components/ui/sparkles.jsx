"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../lib/utils";

export const Sparkles = ({
    id,
    className,
    background,
    minSize,
    maxSize,
    particleDensity,
    particleColor,
    particleOffsetTop,
    particleOffsetBottom,
    speed,
}) => {
    const [init, setInit] = useState(false);
    useEffect(() => {
        setInit(true);
    }, []);
    const controls = useAnimation();

    const particles = new Array(particleDensity || 50).fill(0).map((_, i) => ({
        id: i,
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        size: Math.random() * ((maxSize || 2) - (minSize || 0.5)) + (minSize || 0.5),
        duration: Math.random() * 20 + (speed || 5),
    }));

    return (
        <div className={cn("absolute inset-0 overflow-hidden", className)}>
            {init && (
                <motion.div
                    animate={{
                        y: ["0%", "-100%"],
                    }}
                    transition={{
                        duration: speed || 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="w-full h-full absolute top-0 left-0"
                >
                    {particles.map((particle) => (
                        <motion.span
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                                background: particleColor || "#FFFFFF",
                                width: particle.size,
                                height: particle.size,
                                left: particle.x,
                                top: particle.y,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 2 + 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
};
