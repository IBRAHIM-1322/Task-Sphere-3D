import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  CheckCircle2,
  Check,
  Star,
  Globe,
  Database,
  Lock,
} from 'lucide-react';
import FloatingScene3D from '../components/3d/FloatingScene3D';
import ThemeToggle from '../components/common/ThemeToggle';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Layers,
      title: '3D Spatial Workspace',
      desc: 'Interactive 3D visuals, depth perspective, and physics-driven tilt effects make organizing tasks inspiring.',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Lock,
      title: 'Strict User Isolation',
      desc: 'Enterprise-grade JWT authentication and server-side MongoDB validation guarantees complete task privacy.',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: BarChart3,
      title: 'Productivity Analytics',
      desc: 'Real-time completion gauges, category breakdowns, and performance tracking calculate your progress on the fly.',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: Zap,
      title: 'Lightning Smart Filters',
      desc: 'Filter by priority, due dates, custom categories, or instant search with zero latency and smooth animations.',
      gradient: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 selection:bg-brand-500 selection:text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyanGlow/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyanGlow p-0.5 shadow-neon-purple flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyanGlow" />
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Task<span className="text-brand-400">Sphere</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyanGlow text-white text-xs font-bold shadow-neon-purple hover:scale-105 transition"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyanGlow text-white text-xs font-bold shadow-neon-purple hover:scale-105 transition"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-8 sm:pt-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-semibold text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-cyanGlow" />
              <span>Next-Generation Productivity SaaS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Organize Your Life.{' '}
              <span className="gradient-text block mt-1">One 3D Task at a Time.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the future of personal workflow management. Featuring dynamic 3D physics, glassmorphic aesthetics, productivity metrics, and ironclad MongoDB security.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/signup"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyanGlow hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-sm shadow-neon-purple hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 transition-all"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl glass-card hover:border-brand-500/50 text-slate-200 hover:text-white font-semibold text-sm transition"
              >
                <span>Explore Live Workspace</span>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full MERN Stack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyanGlow" />
                <span>Private & Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>3D Accelerated</span>
              </div>
            </div>
          </motion.div>

          {/* Hero 3D Canvas Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <div className="w-full max-w-lg aspect-square relative rounded-3xl glass-card border border-white/10 p-2 overflow-hidden shadow-2xl">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    Loading 3D Scene...
                  </div>
                }
              >
                <FloatingScene3D />
              </Suspense>

              {/* Floating Glass Showcase Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dropdown border border-white/15 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Interactive 3D Engine</p>
                    <p className="text-[11px] text-cyanGlow">WebGL & Three.js Powered</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  60 FPS Smooth
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-cyanGlow">
            Architected for Excellence
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
            Designed for Focus and High Performance
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Everything you need to capture tasks, track analytics, and achieve flow state every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden transition-all duration-300 hover:border-brand-500/40 hover:shadow-neon-purple group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.gradient} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-200">TaskSphere 3D</span>
          <span>— Full-Stack MERN Todo SaaS</span>
        </div>
        <p>© 2026 TaskSphere. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
