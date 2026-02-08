"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const VerticalCutReveal = ({
    children,
    className,
    containerClassName,
    splitBy = "words",
    staggerDuration = 0.1,
    staggerFrom = "first",
    reverse = false,
    transition = {
        type: "spring",
        stiffness: 200,
        damping: 20,
    }
}) => {
    const words = typeof children === 'string' ? children.split(" ") : [];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDuration,
            },
        },
    };

    const itemVariants = {
        hidden: {
            y: "100%",
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: transition,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className={cn("flex flex-wrap", containerClassName)}
        >
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden inline-block mr-[0.25em]">
                    <motion.span variants={itemVariants} className={cn("inline-block", className)}>
                        {word}
                    </motion.span>
                </div>
            ))}
        </motion.div>
    );
};
