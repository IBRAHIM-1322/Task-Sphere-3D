import User from '../models/User.js';
import Todo from '../models/Todo.js';

// @desc    Get user profile with productivity overview
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get quick stats for profile
    const [totalTasks, completedTasks] = await Promise.all([
      Todo.countDocuments({ user: user._id }),
      Todo.countDocuments({ user: user._id, completed: true }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        stats: {
          totalTasks,
          completedTasks,
          completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { name, username, bio, avatar, currentPassword, newPassword } = req.body;

    // If username is changing, verify uniqueness
    if (username && username.toLowerCase() !== user.username) {
      const usernameExists = await User.findOne({
        username: username.toLowerCase(),
        _id: { $ne: user._id },
      });

      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: 'Username is already taken by another user',
        });
      }
      user.username = username.toLowerCase();
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;

    // If user requested a password change
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Please provide your current password to change password',
        });
      }

      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect',
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long',
        });
      }

      user.password = newPassword; // Pre-save hook will hash it
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        createdAt: updatedUser.createdAt,
      },
      message: 'Profile updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
