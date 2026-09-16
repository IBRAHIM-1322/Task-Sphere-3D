import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ search, setSearch }) => {
  const inputRef = useRef(null);

  const handleClear = () => {
    setSearch('');
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="relative flex-1 max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks by title or description..."
        className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all"
      />

      {search && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
