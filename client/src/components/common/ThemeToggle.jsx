import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl glass-card text-slate-400 hover:text-slate-100 hover:border-brand-500/40 transition-all duration-200 flex items-center justify-center ${className}`}
      aria-label="Toggle Theme"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]" />
      ) : (
        <Moon className="w-5 h-5 text-brand-600 drop-shadow-[0_0_8px_rgba(124,58,237,0.4)]" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
