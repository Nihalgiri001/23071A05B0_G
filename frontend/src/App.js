import React, { useState } from 'react';
import BookmarkForm from './components/BookmarkForm';
import BookmarkTable from './components/BookmarkTable';
import SearchBar from './components/SearchBar';

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (newBookmark) => {
    setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
  };

  const handleSearch = (filteredBookmarks) => {
    setBookmarks(filteredBookmarks);
  };

  return (
    <div className="App">
      <h1>Bookmark Manager</h1>
      <SearchBar onSearch={handleSearch} />
      <BookmarkForm addBookmark={addBookmark} />
      <BookmarkTable bookmarks={bookmarks} setBookmarks={setBookmarks} />
    </div>
  );
}

export default App;