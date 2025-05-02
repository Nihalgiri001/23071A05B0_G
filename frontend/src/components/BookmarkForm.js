import React, { useState } from 'react';

function BookmarkForm({ addBookmark }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url }),
      });
      if (response.ok) {
        const newBookmark = await response.json();
        setTitle('');
        setUrl('');
        addBookmark(newBookmark); // Update the shared state
        alert('Bookmark added successfully!');
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Add Bookmark</button>
    </form>
  );
}

export default BookmarkForm;