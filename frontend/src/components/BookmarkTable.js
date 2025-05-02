import React, { useEffect, useState } from 'react';

function BookmarkTable() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const response = await fetch('http://localhost:5000/api/bookmarks');
      const data = await response.json();
      setBookmarks(data);
    };
    fetchBookmarks();
  }, []);

  const downloadBookmarks = () => {
    const blob = new Blob([JSON.stringify(bookmarks, null, 2)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={downloadBookmarks}>Download Bookmarks</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {bookmarks.map((bookmark) => (
            <tr key={bookmark._id}>
              <td>{bookmark.title}</td>
              <td><a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookmarkTable;