import React from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../../hooks/use3DTilt';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = 'from-brand-500 to-indigo-600',
  glowColor = 'shadow-neon-purple',
  badgeText,
}) => {
  const { ref, props } = use3DTilt(10);

  return (
    <motion.div
      ref={ref}
      {...props}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden transition-all duration-300 hover:${glowColor} group`}
    >
      {/* Background ambient gradient glow */}
      <div
        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-25 blur-2xl transition-opacity duration-300 pointer-events-none`}
      />

      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-200">
          <Icon className="w-5 h-5 text-slate-200 group-hover:text-cyanGlow transition-colors" />
        </div>
        {badgeText && (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
            {badgeText}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans mb-0.5">
          {value}
        </p>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        {subtitle && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
