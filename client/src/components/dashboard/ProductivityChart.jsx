import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import { use3DTilt } from '../../hooks/use3DTilt';

const ProductivityChart = ({ stats }) => {
  const { ref, props } = use3DTilt(6);
  const completionRate = stats?.completionRate || 0;
  const total = stats?.total || 0;
  const completed = stats?.completed || 0;
  const pending = stats?.pending || 0;

  // SVG circular calculation
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  const categoryColors = {
    Personal: 'from-blue-500 to-indigo-500',
    Work: 'from-purple-500 to-pink-500',
    Study: 'from-amber-400 to-orange-500',
    Fitness: 'from-emerald-400 to-teal-500',
    Shopping: 'from-rose-400 to-red-500',
    Other: 'from-cyan-400 to-blue-500',
  };

  return (
    <motion.div
      ref={ref}
      {...props}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5 sm:p-6 border border-white/5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Productivity Overview
            </h3>
            <p className="text-xs text-slate-400">Live task completion metrics</p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyanGlow">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Real-Time</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Circular Progress Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-black/20 border border-white/5">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Arc */}
              <motion.circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-cyanGlow"
                strokeWidth="10"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-slate-100">{completionRate}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Finished
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-medium mt-3 text-center">
            {completed} of {total} tasks cleared
          </p>
        </div>

        {/* Category Breakdown Bars */}
        <div className="md:col-span-8 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Category Breakdown
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stats?.categories?.map((cat) => {
              const catPercent =
                cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0;
              const grad = categoryColors[cat.category] || 'from-brand-500 to-cyan-500';

              return (
                <div
                  key={cat.category}
                  className="p-3 rounded-xl bg-slate-900/40 border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{cat.category}</span>
                    <span className="text-slate-400 font-medium">
                      {cat.completed}/{cat.total} ({catPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${catPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${grad} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductivityChart;
