import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoCard from './TodoCard';
import SkeletonCard from '../common/SkeletonCard';
import EmptyState from '../common/EmptyState';

const TodoList = ({
  todos,
  loading,
  onToggle,
  onEdit,
  onDelete,
  onAddNew,
  isFiltered,
  resetFilters,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <EmptyState
        onAddNew={onAddNew}
        isFiltered={isFiltered}
        resetFilters={resetFilters}
      />
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
    >
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList;
