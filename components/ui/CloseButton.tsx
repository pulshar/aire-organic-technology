import React from 'react';
import { motion } from 'framer-motion';

interface CloseButtonProps {
    onClick: () => void;
    className?: string;
    variant?: 'floating' | 'inline';
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = '', variant = 'floating' }) => {
    if (variant === 'inline') {
        return (
            <button
                onClick={onClick}
                className={`text-aire-stone hover:text-aire-text text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors group cursor-pointer ${className}`}
            >
                <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver a la tienda
            </button>
        );
    }

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
            }}
            onClick={onClick}
            className={`fixed cursor-pointer top-6 right-6 md:top-12 md:right-12 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-aire-text shadow-sm hover:bg-aire-text hover:text-aire-bg active:bg-aire-dark transition-all duration-700 ease-aire-smooth ${className}`}
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </motion.button>
    );
};

export default CloseButton;
