const Bookmark = require('../models/Bookmark');

// Add a new bookmark
exports.addBookmark = async (req, res) => {
  try {
    const { title, url } = req.body;
    const newBookmark = new Bookmark({ title, url });
    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
};

// Get all bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};

// Update the searchBookmarks function to include filtering by tags
exports.searchBookmarks = async (req, res) => {
  try {
    const { query } = req.query;
    const bookmarks = await Bookmark.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { url: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }, // Added filtering by tags
      ],
    });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search bookmarks' });
  }
};

// Download bookmarks as a text file
exports.downloadBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    const content = bookmarks.map(b => `${b.title}: ${b.url}`).join('\n');
    res.setHeader('Content-Disposition', 'attachment; filename=bookmarks.txt');
    res.setHeader('Content-Type', 'text/plain');
    res.send(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download bookmarks' });
  }
};

// Delete a bookmark
exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookmark = await Bookmark.findByIdAndDelete(id);

    if (!deletedBookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
};