const express = require('express');
const router = express.Router();
const ThoughtController = require('../controllers/thought-controller');

// /api/thoughts
router.route('/')
  .get(ThoughtController.getAllThoughts)
  .post(ThoughtController.createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(ThoughtController.getThoughtById)
  .put(ThoughtController.updateThought)
  .delete(ThoughtController.deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(ThoughtController.createReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(ThoughtController.deleteReaction)

module.exports = router;
