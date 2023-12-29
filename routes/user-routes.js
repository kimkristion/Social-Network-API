const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller'); // Corrected file name

// /api/users
router.route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

// /api/users/:userId
router.route('/:userId')
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

router.route('/:userId/friends/:friendId')
  .post(UserController.addFriend)
  .delete(UserController.deleteFriend)

module.exports = router;
