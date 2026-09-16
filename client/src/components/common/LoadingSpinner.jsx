import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ text = 'Loading Workspace...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Outer glowing spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyanGlow border-r-brand-500 shadow-neon-cyan"
        />
        {/* Inner reverse spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-brand-400 border-l-pink-500 shadow-neon-purple"
        />
        {/* Center pulsing core */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-cyanGlow to-brand-500 shadow-lg"
        />
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-300"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return <div className="py-16 flex items-center justify-center">{content}</div>;
};

export default LoadingSpinner;
