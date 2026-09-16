import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  CheckCircle2,
  Clock,
  Flame,
  ListTodo,
  Sparkles,
  BarChart2,
  Filter,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../hooks/useTodos';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import StatCard from '../components/dashboard/StatCard';
import ProductivityChart from '../components/dashboard/ProductivityChart';
import SearchBar from '../components/dashboard/SearchBar';
import TodoFilter from '../components/dashboard/TodoFilter';
import TodoList from '../components/todos/TodoList';
import TodoModal from '../components/todos/TodoModal';
import ConfirmDialog from '../components/common/ConfirmDialog';

const DashboardPage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    todos,
    stats,
    loading,
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority,
    category,
    setCategory,
    sort,
    setSort,
    isModalOpen,
    setIsModalOpen,
    editingTodo,
    modalLoading,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    todoToDelete,
    deleteLoading,
    isFiltered,
    toggleTodo,
    handleSaveTodo,
    openEditModal,
    openCreateModal,
    promptDelete,
    confirmDelete,
    resetFilters,
  } = useTodos();

  const handleSidebarFilter = (filterObj) => {
    if (filterObj.status) setStatus(filterObj.status);
    if (filterObj.priority) setPriority(filterObj.priority);
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        isSidebarOpen={sidebarOpen}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex w-full">
        {/* Responsive Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          stats={stats}
          activeFilter={{ status, priority }}
          setActiveFilter={handleSidebarFilter}
          onOpenCreateModal={openCreateModal}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-7 lg:p-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
          {/* Welcome Greeting Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
                  Welcome back, {user?.name || 'Ibrahim'} 👋
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                You have{' '}
                <span className="text-cyanGlow font-bold">{stats.pending}</span> tasks
                remaining in your workspace today.
              </p>
            </div>

            {/* Quick Add Task Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-cyanGlow text-white font-bold text-xs sm:text-sm shadow-neon-purple hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Task</span>
            </motion.button>
          </div>

          {/* 3D Animated Statistics Overview Cards */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <StatCard
              title="Total Tasks"
              value={stats.total}
              subtitle="All registered items"
              icon={ListTodo}
              gradient="from-indigo-600 to-brand-500"
              glowColor="shadow-neon-purple"
            />
            <StatCard
              title="In Progress"
              value={stats.pending}
              subtitle="Pending execution"
              icon={Clock}
              gradient="from-cyan-500 to-blue-600"
              glowColor="shadow-neon-cyan"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              subtitle={`${stats.completionRate}% completion rate`}
              icon={CheckCircle2}
              gradient="from-emerald-500 to-teal-600"
              glowColor="shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              badgeText="Finished"
            />
            <StatCard
              title="High Priority"
              value={stats.highPriority}
              subtitle="Requires attention"
              icon={Flame}
              gradient="from-rose-500 to-amber-600"
              glowColor="shadow-[0_0_20px_rgba(244,63,94,0.3)]"
              badgeText="Critical"
            />
          </section>

          {/* Productivity Chart & Visual Progress */}
          <section>
            <ProductivityChart stats={stats} />
          </section>

          {/* Search, Filter & View Controls */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <SearchBar search={search} setSearch={setSearch} />
              <div className="text-xs text-slate-400 font-semibold px-2">
                Showing {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
              </div>
            </div>

            <TodoFilter
              status={status}
              setStatus={setStatus}
              priority={priority}
              setPriority={setPriority}
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
            />
          </section>

          {/* Todo Cards Grid Section */}
          <section className="pb-12">
            <TodoList
              todos={todos}
              loading={loading}
              onToggle={toggleTodo}
              onEdit={openEditModal}
              onDelete={promptDelete}
              onAddNew={openCreateModal}
              isFiltered={isFiltered}
              resetFilters={resetFilters}
            />
          </section>
        </main>
      </div>

      {/* Add / Edit Task Modal */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTodo}
        editingTodo={editingTodo}
        loading={modalLoading}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete this task?"
        message={`Are you sure you want to delete "${todoToDelete?.title}"? This task will be permanently removed from MongoDB.`}
        confirmText="Yes, Delete"
        cancelText="Keep Task"
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setTodoToDelete(null);
        }}
        loading={deleteLoading}
      />
    </div>
  );
};

export default DashboardPage;
