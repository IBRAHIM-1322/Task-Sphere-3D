import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  Sparkles,
  Lock,
  Check,
  Edit2,
  CheckCircle2,
  ListTodo,
  Shield,
} from 'lucide-react';
import { use3DTilt } from '../../hooks/use3DTilt';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const ProfileCard = () => {
  const { user, updateProfile } = useAuth();
  const toast = useToast();
  const { ref, props } = use3DTilt(5);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  ];

  const handleSave = async (e) => {
    e.preventDefault();

    if (showPasswordChange) {
      if (!formData.currentPassword) {
        toast.error('Please enter current password to set a new password');
        return;
      }
      if (formData.newPassword.length < 6) {
        toast.error('New password must be at least 6 characters');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }
    }

    setLoading(true);
    const payload = {
      name: formData.name,
      username: formData.username,
      bio: formData.bio,
      avatar: formData.avatar,
    };

    if (showPasswordChange && formData.newPassword) {
      payload.currentPassword = formData.currentPassword;
      payload.newPassword = formData.newPassword;
    }

    const res = await updateProfile(payload);
    setLoading(false);

    if (res.success) {
      setIsEditing(false);
      setShowPasswordChange(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 3D Glass Profile Showcase Card */}
      <motion.div
        ref={ref}
        {...props}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 right-0 w-96 h-48 bg-gradient-to-l from-brand-600/30 to-cyanGlow/20 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar Container */}
          <div className="relative group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-brand-500/50 shadow-neon-purple bg-slate-800 p-1">
              <img
                src={user?.avatar || avatarPresets[0]}
                alt={user?.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900 border border-brand-400/40 text-cyanGlow shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* User Info & Bio */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  {user?.name}
                </h2>
                <p className="text-sm font-semibold text-cyanGlow">@{user?.username}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card hover:border-brand-500/40 text-xs font-semibold text-slate-200 transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </motion.button>
            </div>

            <p className="text-sm text-slate-300 max-w-xl mb-4 leading-relaxed">
              {user?.bio || 'Productivity enthusiast on TaskSphere.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-brand-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyanGlow" />
                <span>Joined {formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Verified Account</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10"
        >
          <h3 className="text-lg font-bold text-slate-100 mb-4 pb-2 border-b border-white/5">
            Update Profile Information
          </h3>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Avatar Selection Presets */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Choose Avatar Preset
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {avatarPresets.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setFormData((prev) => ({ ...prev, avatar: preset }))}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                      formData.avatar === preset
                        ? 'border-cyanGlow scale-110 shadow-neon-cyan'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Avatar URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Or Custom Image URL
              </label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData((prev) => ({ ...prev, avatar: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            {/* Name & Username Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Bio
              </label>
              <textarea
                rows="3"
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {/* Password Toggle Accordion */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowPasswordChange((prev) => !prev)}
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{showPasswordChange ? 'Cancel Password Change' : 'Change Password'}</span>
              </button>

              {showPasswordChange && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, currentPassword: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-100 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-100 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-xl glass-input text-slate-100 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyanGlow text-white text-xs font-bold shadow-neon-purple hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileCard;
