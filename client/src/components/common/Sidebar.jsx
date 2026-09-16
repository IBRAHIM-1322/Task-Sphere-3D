import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  Flame,
  User,
  LogOut,
  FolderKanban,
  PlusCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({
  isOpen,
  onClose,
  stats,
  activeFilter,
  setActiveFilter,
  onOpenCreateModal,
}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: LayoutDashboard,
      count: stats?.total || 0,
      filter: { status: 'all', priority: 'all' },
    },
    {
      id: 'active',
      label: 'In Progress',
      icon: Clock,
      count: stats?.pending || 0,
      filter: { status: 'active', priority: 'all' },
      badgeColor: 'bg-cyan-500/20 text-cyanGlow border-cyan-500/30',
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle,
      count: stats?.completed || 0,
      filter: { status: 'completed', priority: 'all' },
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'high-priority',
      label: 'High Priority',
      icon: Flame,
      count: stats?.highPriority || 0,
      filter: { status: 'all', priority: 'High' },
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 sm:p-5">
      {/* Top Section */}
      <div className="space-y-6">
        {/* Header for mobile view */}
        <div className="flex items-center justify-between lg:hidden pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-slate-100">
              Task<span className="text-brand-400">Sphere</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Add Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            onOpenCreateModal();
            if (onClose) onClose();
          }}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-brand-600 to-cyanGlow hover:from-brand-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-neon-purple transition-all duration-200 group"
        >
          <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Task</span>
        </motion.button>

        {/* Navigation Categories */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400/80 mb-2">
            Views & Filters
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected =
              activeFilter?.id === item.id ||
              (activeFilter?.status === item.filter.status &&
                activeFilter?.priority === item.filter.priority);

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveFilter({ id: item.id, ...item.filter });
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyanGlow' : ''}`} />
                  <span>{item.label}</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${
                    item.badgeColor || 'bg-slate-800 text-slate-400 border-white/5'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Links section */}
        <div className="space-y-1 pt-2">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400/80 mb-2">
            Account & Settings
          </p>
          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </NavLink>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-4 border-t border-white/5 space-y-3">
        {/* Productivity Badge */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-950/40 to-cyan-950/40 border border-brand-500/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-cyanGlow" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {stats?.completionRate || 0}% Completed
            </p>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats?.completionRate || 0}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-brand-500 to-cyanGlow rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 glass-card border-r border-white/5 min-h-[calc(100vh-65px)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-72 max-w-[80vw] h-full glass-dropdown border-r border-white/10 shadow-2xl z-10"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
