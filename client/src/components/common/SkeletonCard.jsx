import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden animate-pulse">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-lg bg-slate-700/50" />
          <div className="h-5 w-48 bg-slate-700/50 rounded-md" />
        </div>
        <div className="h-6 w-16 bg-slate-700/50 rounded-full" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-3.5 w-full bg-slate-700/40 rounded" />
        <div className="h-3.5 w-3/4 bg-slate-700/30 rounded" />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 bg-slate-700/40 rounded-full" />
          <div className="h-6 w-24 bg-slate-700/30 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="w-7 h-7 bg-slate-700/50 rounded-lg" />
          <div className="w-7 h-7 bg-slate-700/50 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
