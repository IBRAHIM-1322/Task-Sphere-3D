import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Check,
  Edit3,
  Trash2,
  Tag,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { use3DTilt } from '../../hooks/use3DTilt';

const TodoCard = ({ todo, onToggle, onEdit, onDelete }) => {
  const { ref, props } = use3DTilt(7);

  const priorityStyles = {
    High: 'bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.15)]',
    Medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    Low: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
  };

  const categoryStyles = {
    Personal: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    Work: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    Study: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    Fitness: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    Shopping: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    Other: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const isPast = date < now && !todo.completed;

    return {
      text: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      }),
      isPast,
    };
  };

  const dueDateInfo = formatDueDate(todo.dueDate);

  return (
    <motion.div
      ref={ref}
      {...props}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className={`glass-card rounded-2xl p-5 border relative overflow-hidden transition-all duration-200 group ${
        todo.completed
          ? 'opacity-65 border-white/5 bg-slate-950/40'
          : 'border-white/10 hover:border-brand-500/40 shadow-sm hover:shadow-3d-lift'
      }`}
    >
      {/* Top row: Checkbox, Title, Priority */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Completion Checkbox */}
          <button
            onClick={() => onToggle(todo._id)}
            className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 border ${
              todo.completed
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 border-emerald-400 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                : 'border-slate-500/50 hover:border-brand-400 bg-slate-900/50 text-transparent'
            }`}
            aria-label={todo.completed ? 'Mark task as active' : 'Mark task as completed'}
          >
            <motion.div
              initial={false}
              animate={{ scale: todo.completed ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </motion.div>
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h4
              className={`text-base font-semibold tracking-tight transition-all duration-200 break-words ${
                todo.completed
                  ? 'line-through text-slate-400'
                  : 'text-slate-100 group-hover:text-white'
              }`}
            >
              {todo.title}
            </h4>
          </div>
        </div>

        {/* Priority Badge */}
        <span
          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
            priorityStyles[todo.priority] || priorityStyles.Medium
          }`}
        >
          {todo.priority}
        </span>
      </div>

      {/* Description */}
      {todo.description && (
        <p
          className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
            todo.completed ? 'text-slate-400/80 line-through' : 'text-slate-300'
          }`}
        >
          {todo.description}
        </p>
      )}

      {/* Bottom Metadata & Actions */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Chip */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-semibold ${
              categoryStyles[todo.category] || categoryStyles.Personal
            }`}
          >
            <Tag className="w-3 h-3" />
            {todo.category}
          </span>

          {/* Due Date Indicator */}
          {dueDateInfo && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-medium ${
                dueDateInfo.isPast
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-slate-800 text-slate-300 border-white/5'
              }`}
              title={dueDateInfo.isPast ? 'Overdue' : 'Due date'}
            >
              <Calendar className="w-3 h-3" />
              {dueDateInfo.text}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(todo)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyanGlow hover:bg-white/5 transition"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(todo)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoCard;
