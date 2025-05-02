import React, { useState, useEffect } from 'react';
import BookmarkForm from './components/BookmarkForm';
import BookmarkTable from './components/BookmarkTable';
import SearchBar from './components/SearchBar';

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookmarks');
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []);

  const addBookmark = (newBookmark) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
  };

  const handleSearch = (filteredBookmarks) => {
    setBookmarks(filteredBookmarks);
  };

  const downloadBookmarks = () => {
    const content = bookmarks.map(bookmark => `${bookmark.title} : ${bookmark.url}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <h1>Bookmark Manager</h1>
      <SearchBar onSearch={handleSearch} />
      <BookmarkForm addBookmark={addBookmark} />
      <BookmarkTable bookmarks={bookmarks} setBookmarks={setBookmarks} />
      <button onClick={downloadBookmarks}>Download Bookmarks</button>
    </div>
  );
}

export default App;