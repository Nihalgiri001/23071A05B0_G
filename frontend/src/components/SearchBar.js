import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookmarks/search?query=${query}`);
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error('Error searching bookmarks:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search bookmarks"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;