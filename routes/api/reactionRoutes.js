const router = require('express').Router();
const {
  getReaction,
  getSingleReaction,
  createReaction,
  updateReaction,
  deleteReaction,
} = require('../../controllers/reactionController.js');

// /api/reactions
router.route('/').get(getReaction).post(createReaction);

// /api/reactions/:reactionId
router
  .route('/:reactionId')
  .get(getSingleReaction)
  .put(updateReaction)
  .delete(deleteReaction);

module.exports = router;
