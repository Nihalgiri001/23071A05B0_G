const Bookmark = require('../models/Bookmark');

// Get all bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new bookmark
exports.addBookmark = async (req, res) => {
  try {
    const { title, url } = req.body;
    const newBookmark = new Bookmark({ title, url });
    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};