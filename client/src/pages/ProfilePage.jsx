import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Sparkles } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import ProfileCard from '../components/profile/ProfileCard';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => {}} isSidebarOpen={false} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyanGlow transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-brand-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyanGlow" />
            <span>Account Center</span>
          </div>
        </div>

        {/* Profile Card */}
        <ProfileCard />
      </main>
    </div>
  );
};

export default ProfilePage;
