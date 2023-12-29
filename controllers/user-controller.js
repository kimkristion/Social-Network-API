// controllers/userController.js
const User = require('../models/User'); // Import the User model

const UserController = {
  // Get all users with populated thoughts and friends
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a user by their ID
  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({ username, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update a user by their ID
  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a user by their ID
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Add a friend to a user's friends list
  addFriend: async (req, res) => {
    const { userId, friendId } = req.params;
  
    try {
      if (userId === friendId) {
        return res.status(400).json({ error: "Cannot add yourself as a friend." });
      }
  
      const user = await User.findById(userId);
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ error: "User is already your friend." });
      }
  
      await User.findByIdAndUpdate(userId, { $push: { friends: friendId } });
  
      res.json({ message: "Friend added successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error. Could not add friend." });
    }
  },
  
  // Delete a friend from a user's friends list
  deleteFriend: async (req, res) => {
    const { userId, friendId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user.friends.includes(friendId)) {
        return res.status(400).json({ error: "Friend does not exist in your friends list." });
      }
  
      await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
  
      res.json({ message: "Friend deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error. Could not delete friend." });
    }
  }
};

module.exports = UserController; // Export the UserController module
