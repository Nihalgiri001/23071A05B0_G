import React from 'react';

function BookmarkTable({ bookmarks, setBookmarks }) {
  const downloadBookmarks = () => {
    const blob = new Blob([JSON.stringify(bookmarks, null, 2)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const removeBookmark = async (id) => {
    try {
      // Optimistically update the UI
      setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark._id !== id));

      const response = await fetch(`http://localhost:5000/api/bookmarks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete bookmark from server');
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
      // Optionally, revert the optimistic update if the request fails
      setBookmarks((prevBookmarks) => [...prevBookmarks, bookmarks.find((bookmark) => bookmark._id === id)]);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookmarks.map((bookmark) => (
            <tr key={bookmark._id}>
              <td>{bookmark.title}</td>
              <td><a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a></td>
              <td>{new Date(bookmark.createdAt).toLocaleDateString('en-GB')}</td>
              <td><button onClick={() => removeBookmark(bookmark._id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookmarkTable;