import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0,
    completionRate: 0,
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // Filters and Query State
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Delete Confirmation Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const toast = useToast();

  // Fetch productivity stats
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const res = await api.get('/todos/stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch todos with active filters
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (status !== 'all') params.status = status;
      if (priority !== 'all') params.priority = priority;
      if (category !== 'all') params.category = category;
      if (sort) params.sort = sort;

      const res = await api.get('/todos', { params });
      if (res.data.success) {
        setTodos(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to load tasks from server.');
    } finally {
      setLoading(false);
    }
  }, [search, status, priority, category, sort, toast]);

  // Initial load and filter change trigger
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Toggle Todo Completion
  const toggleTodo = async (id) => {
    try {
      // Optimistic update
      const previousTodos = [...todos];
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
      );

      const res = await api.patch(`/todos/${id}/toggle`);
      if (res.data.success) {
        const isNowCompleted = res.data.data.completed;
        if (isNowCompleted) {
          toast.success('Task finished! Keep up the momentum! 🎉');
          // Trigger confetti if all tasks are completed
          if (stats.pending === 1) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'],
            });
          }
        }
        fetchStats();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
      toast.error('Failed to update task status.');
      fetchTodos(); // rollback
    }
  };

  // Create or Update Todo
  const handleSaveTodo = async (formData) => {
    setModalLoading(true);
    try {
      if (editingTodo) {
        const res = await api.put(`/todos/${editingTodo._id}`, formData);
        if (res.data.success) {
          toast.success('Task updated successfully!');
          setIsModalOpen(false);
          setEditingTodo(null);
          fetchTodos();
          fetchStats();
        }
      } else {
        const res = await api.post('/todos', formData);
        if (res.data.success) {
          toast.success('New task added to your workspace!');
          setIsModalOpen(false);
          fetchTodos();
          fetchStats();
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to save task.';
      toast.error(msg);
    } finally {
      setModalLoading(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  // Open Delete Confirmation
  const promptDelete = (todo) => {
    setTodoToDelete(todo);
    setIsDeleteDialogOpen(true);
  };

  // Confirm Delete Action
  const confirmDelete = async () => {
    if (!todoToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await api.delete(`/todos/${todoToDelete._id}`);
      if (res.data.success) {
        toast.info('Task deleted.');
        setIsDeleteDialogOpen(false);
        setTodoToDelete(null);
        fetchTodos();
        fetchStats();
      }
    } catch (error) {
      toast.error('Failed to delete task.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Reset Filters
  const resetFilters = () => {
    setSearch('');
    setStatus('all');
    setPriority('all');
    setCategory('all');
    setSort('newest');
  };

  const isFiltered =
    search.trim() !== '' ||
    status !== 'all' ||
    priority !== 'all' ||
    category !== 'all';

  return {
    todos,
    stats,
    loading,
    statsLoading,
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
    fetchTodos,
    fetchStats,
    toggleTodo,
    handleSaveTodo,
    openEditModal,
    openCreateModal,
    promptDelete,
    confirmDelete,
    resetFilters,
  };
};
