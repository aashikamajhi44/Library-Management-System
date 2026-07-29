const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback, getPublicFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');
const { authorize, requireApproved } = require('../middleware/role');

router.post('/', protect, requireApproved, createFeedback);
router.get('/', protect, authorize('librarian'), getAllFeedback);
router.get('/public', getPublicFeedback);

module.exports = router;
