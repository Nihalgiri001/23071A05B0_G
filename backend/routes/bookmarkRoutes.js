const express = require('express');
const { getBookmarks, addBookmark } = require('../controllers/bookmarkController');

const router = express.Router();

router.get('/', getBookmarks);
router.post('/', addBookmark);

module.exports = router;