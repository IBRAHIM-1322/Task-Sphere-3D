import Todo from '../models/Todo.js';

// @desc    Get all todos for the logged-in user with search, filter, and sorting
// @route   GET /api/todos
// @access  Private
export const getTodos = async (req, res, next) => {
  try {
    const { search, status, priority, category, sort } = req.query;

    // Strict user isolation filter
    const query = { user: req.user._id };

    // Status filter
    if (status === 'completed') {
      query.completed = true;
    } else if (status === 'active') {
      query.completed = false;
    }

    // Priority filter
    if (priority && priority !== 'all') {
      query.priority = priority;
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search filter (title or description)
    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    // Sorting
    let sortOptions = { createdAt: -1 }; // default newest
    if (sort === 'oldest') {
      sortOptions = { createdAt: 1 };
    } else if (sort === 'dueDate') {
      sortOptions = { dueDate: 1, createdAt: -1 };
    } else if (sort === 'title') {
      sortOptions = { title: 1 };
    }

    const todos = await Todo.find(query).sort(sortOptions);

    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Private
export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Strict user ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to access this todo',
      });
    }

    return res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private
export const createTodo = async (req, res, next) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title',
      });
    }

    const todo = await Todo.create({
      user: req.user._id,
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'Medium',
      category: category || 'Personal',
      dueDate: dueDate || null,
      completed: false,
    });

    return res.status(201).json({
      success: true,
      data: todo,
      message: 'Task created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
export const updateTodo = async (req, res, next) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Strict user ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to update this todo',
      });
    }

    const { title, description, priority, category, dueDate, completed } = req.body;

    if (title !== undefined) todo.title = title.trim();
    if (description !== undefined) todo.description = description.trim();
    if (priority !== undefined) todo.priority = priority;
    if (category !== undefined) todo.category = category;
    if (dueDate !== undefined) todo.dueDate = dueDate || null;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();

    return res.status(200).json({
      success: true,
      data: updatedTodo,
      message: 'Task updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle todo completion status
// @route   PATCH /api/todos/:id/toggle
// @access  Private
export const toggleTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Strict user ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to modify this todo',
      });
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();

    return res.status(200).json({
      success: true,
      data: updatedTodo,
      message: updatedTodo.completed ? 'Task marked as completed! 🎉' : 'Task marked as active',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    // Strict user ownership check
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to delete this todo',
      });
    }

    await todo.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get aggregated productivity statistics for logged-in user
// @route   GET /api/todos/stats
// @access  Private
export const getTodoStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [total, completed, highPriorityPending, categoryCounts] = await Promise.all([
      Todo.countDocuments({ user: userId }),
      Todo.countDocuments({ user: userId, completed: true }),
      Todo.countDocuments({ user: userId, completed: false, priority: 'High' }),
      Todo.aggregate([
        { $match: { user: userId } },
        {
          $group: {
            _id: '$category',
            total: { $sum: 1 },
            completed: { $sum: { $cond: ['$completed', 1, 0] } },
          },
        },
      ]),
    ]);

    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Format category stats
    const categories = ['Personal', 'Work', 'Study', 'Fitness', 'Shopping', 'Other'];
    const formattedCategories = categories.map((cat) => {
      const match = categoryCounts.find((c) => c._id === cat);
      return {
        category: cat,
        total: match ? match.total : 0,
        completed: match ? match.completed : 0,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        pending,
        highPriority: highPriorityPending,
        completionRate,
        categories: formattedCategories,
      },
    });
  } catch (error) {
    next(error);
  }
};
