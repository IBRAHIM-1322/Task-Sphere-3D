import React from 'react';
import { Filter, ArrowUpDown, Tag, Flame } from 'lucide-react';

const TodoFilter = ({
  status,
  setStatus,
  priority,
  setPriority,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const categories = [
    'All',
    'Personal',
    'Work',
    'Study',
    'Fitness',
    'Shopping',
    'Other',
  ];

  const priorities = ['All', 'High', 'Medium', 'Low'];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'title', label: 'Title (A-Z)' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl glass-card border border-white/5">
      {/* Status Segmented Tabs */}
      <div className="flex items-center p-1 rounded-xl bg-slate-900/60 border border-white/5 overflow-x-auto max-w-full">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatus(opt.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              status === opt.value
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Filter Selectors Group */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Category Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-input text-xs font-medium text-slate-300">
          <Tag className="w-3.5 h-3.5 text-cyanGlow shrink-0" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by Category"
            className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            {categories.map((c) => (
              <option
                key={c}
                value={c === 'All' ? 'all' : c}
                className="bg-slate-900 text-slate-200"
              >
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-input text-xs font-medium text-slate-300">
          <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="Filter by Priority"
            className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            {priorities.map((p) => (
              <option
                key={p}
                value={p === 'All' ? 'all' : p}
                className="bg-slate-900 text-slate-200"
              >
                {p === 'All' ? 'All Priorities' : `${p} Priority`}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-input text-xs font-medium text-slate-300">
          <ArrowUpDown className="w-3.5 h-3.5 text-brand-400 shrink-0" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort Tasks"
            className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            {sortOptions.map((s) => (
              <option
                key={s.value}
                value={s.value}
                className="bg-slate-900 text-slate-200"
              >
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
