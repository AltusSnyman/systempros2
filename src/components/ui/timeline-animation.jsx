"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const TimelineContent = ({
    children,
    className,
    customVariants,
    animationNum = 0,
    as: Component = "div",
    viewport = { once: true, margin: "-100px" },
    ...props
}) => {
    const defaultVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
                ease: "easeOut"
            }
        }),
    };

    return (
        <Component className={className} {...props}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                custom={animationNum}
                variants={customVariants || defaultVariants}
            >
                {children}
            </motion.div>
        </Component>
    );
};
