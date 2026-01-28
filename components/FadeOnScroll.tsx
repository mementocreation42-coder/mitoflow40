'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeOnScrollProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export default function FadeOnScroll({
    children,
    delay = 0,
    className = "",
    direction = 'up'
}: FadeOnScrollProps) {
    const directions = {
        up: { y: 15, x: 0 },
        down: { y: -15, x: 0 },
        left: { x: 15, y: 0 },
        right: { x: -15, y: 0 }
    };

    const initial = {
        opacity: 0,
        ...directions[direction]
    };

    return (
        <motion.div
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }} // Custom cubic bezier for "snappy" feel
            className={className}
        >
            {children}
        </motion.div>
    );
}
