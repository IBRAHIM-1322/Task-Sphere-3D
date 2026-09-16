import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Layers } from 'lucide-react';
import AuthBackground3D from '../components/3d/AuthBackground3D';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-background-dark text-slate-100 overflow-hidden text-center">
      <AuthBackground3D />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md glass-card rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center mx-auto text-cyanGlow shadow-neon-cyan">
          <Layers className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-7xl font-black gradient-text tracking-tighter mb-2">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-100 mb-1">
            Dimension Not Found
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
            The page you are looking for has shifted out of our 3D workspace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-cyanGlow text-white text-xs font-bold shadow-neon-purple hover:scale-105 transition"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-card hover:border-brand-500/40 text-xs font-semibold text-slate-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Landing Page</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
