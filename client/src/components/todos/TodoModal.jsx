import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Calendar,
  Tag,
  Flame,
  FileText,
  Check,
} from 'lucide-react';

const TodoModal = ({ isOpen, onClose, onSave, editingTodo, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Personal',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title || '',
        description: editingTodo.description || '',
        priority: editingTodo.priority || 'Medium',
        category: editingTodo.category || 'Personal',
        dueDate: editingTodo.dueDate
          ? new Date(editingTodo.dueDate).toISOString().split('T')[0]
          : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        category: 'Personal',
        dueDate: '',
      });
    }
    setErrors({});
  }, [editingTodo, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Task title is required';
    } else if (formData.title.length > 150) {
      errs.title = 'Title cannot exceed 150 characters';
    }
    if (formData.description.length > 1000) {
      errs.description = 'Description cannot exceed 1000 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const categories = ['Personal', 'Work', 'Study', 'Fitness', 'Shopping', 'Other'];
  const priorities = [
    { value: 'Low', color: 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' },
    { value: 'Medium', color: 'border-amber-500/50 text-amber-400 bg-amber-500/10' },
    { value: 'High', color: 'border-rose-500/50 text-rose-400 bg-rose-500/10' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Glow Accent */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-brand-500/30 to-transparent blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-600/30 to-cyanGlow/30 border border-brand-500/30 text-cyanGlow">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">
                    {editingTodo ? 'Edit Task' : 'Create New Task'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {editingTodo ? 'Update task details' : 'Add a task to your workspace'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Task Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Design 3D Landing Page"
                  className={`w-full px-4 py-2.5 rounded-xl glass-input text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 ${
                    errors.title
                      ? 'border-rose-500 focus:ring-rose-500/40'
                      : 'focus:ring-brand-500/50 focus:border-brand-500/50'
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-rose-400 mt-1">{errors.title}</p>
                )}
              </div>

              {/* Priority Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Priority Level</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {priorities.map((p) => {
                    const isSelected = formData.priority === p.value;
                    return (
                      <button
                        type="button"
                        key={p.value}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, priority: p.value }))
                        }
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? `${p.color} ring-2 ring-brand-500/40 font-bold`
                            : 'border-white/5 bg-slate-900/40 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{p.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category & Due Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-cyanGlow" />
                    <span>Category</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-slate-200">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-400" />
                    <span>Due Date (Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Description (Optional)</span>
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Provide context, subtasks, or helpful links..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyanGlow hover:from-brand-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-neon-purple transition disabled:opacity-50 flex items-center gap-2"
                >
                  {loading
                    ? 'Saving...'
                    : editingTodo
                    ? 'Save Changes'
                    : 'Create Task'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
