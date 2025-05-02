import React from 'react';
import BookmarkForm from './components/BookmarkForm';
import BookmarkTable from './components/BookmarkTable';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <h1>Bookmark Manager</h1>
      <SearchBar />
      <BookmarkForm />
      <BookmarkTable />
    </div>
  );
}

export default App;