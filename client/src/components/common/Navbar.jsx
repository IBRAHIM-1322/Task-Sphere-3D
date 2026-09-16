import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import {
  Layers,
  LogOut,
  User as UserIcon,
  Menu,
  Sparkles,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-card border-b border-white/5 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Menu Trigger & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition lg:hidden"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyanGlow p-0.5 shadow-neon-purple group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyanGlow group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Task<span className="text-brand-400">Sphere</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyanGlow -mt-1">
              3D Workspace
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Theme Toggle & User Profile Dropdown */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-2xl glass-card hover:border-brand-500/30 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-brand-500/40 bg-slate-800 shrink-0">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  @{user.username}
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 glass-dropdown rounded-2xl p-2 shadow-2xl z-50 border border-white/10"
                >
                  <div className="px-3 py-2.5 mb-1 border-b border-white/5">
                    <p className="text-xs font-medium text-slate-400">Signed in as</p>
                    <p className="text-sm font-bold text-slate-100 truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition"
                  >
                    <UserIcon className="w-4 h-4 text-brand-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyanGlow" />
                    <span>Task Dashboard</span>
                  </Link>

                  <div className="h-px bg-white/5 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
