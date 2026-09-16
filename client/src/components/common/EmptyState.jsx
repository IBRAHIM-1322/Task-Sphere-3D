import React from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckSquare, Sparkles } from 'lucide-react';

const EmptyState = ({ onAddNew, isFiltered = false, resetFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-10 sm:p-14 text-center flex flex-col items-center justify-center max-w-lg mx-auto border border-dashed border-brand-500/20 shadow-glass-glow"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600/30 to-cyanGlow/30 border border-brand-400/30 flex items-center justify-center shadow-neon-purple">
          <CheckSquare className="w-10 h-10 text-cyanGlow" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-500/30 border border-brand-400/50 flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4 text-brand-300" />
        </motion.div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
        {isFiltered ? 'No Matching Tasks Found' : 'Your Workspace is Clear'}
      </h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
        {isFiltered
          ? 'Try adjusting your filters or search keywords to find what you are looking for.'
          : 'Your productivity journey starts here. Create your first task to stay organized and accomplish your goals.'}
      </p>

      {isFiltered ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetFilters}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition border border-white/10"
        >
          Reset All Filters
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddNew}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyanGlow text-white font-medium text-sm shadow-neon-purple transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Your First Task</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
