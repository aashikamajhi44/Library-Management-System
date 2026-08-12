const express = require('express');
const router = express.Router();
const { submitContact, getAllContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.post('/', submitContact);
router.get('/', protect, authorize('admin'), getAllContacts);

module.exports = router;
