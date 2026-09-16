import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    category: {
      type: String,
      enum: ['Personal', 'Work', 'Study', 'Fitness', 'Shopping', 'Other'],
      default: 'Personal',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast queries by user and date
todoSchema.index({ user: 1, createdAt: -1 });
todoSchema.index({ user: 1, completed: 1 });
todoSchema.index({ user: 1, category: 1 });
todoSchema.index({ user: 1, priority: 1 });

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
