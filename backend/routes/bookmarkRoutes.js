const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

// Routes
router.post('/', bookmarkController.addBookmark);
router.get('/', bookmarkController.getBookmarks);
router.get('/search', bookmarkController.searchBookmarks);
router.get('/download', bookmarkController.downloadBookmarks);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;