import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", stock: 1 });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userType");

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    const resBooks = await fetch("/api/admin/books", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const resUsers = await fetch("/api/admin/borrowed", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBooks(await resBooks.json());
    setUsers(await resUsers.json());
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBook),
    });
    setNewBook({ title: "", author: "", stock: 1 });
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Admin Dashboard</h1>

      {/* Add Book Form */}
      <form onSubmit={handleAddBook} className="space-y-4 max-w-md mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          min="1"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </form>

      {/* Book Inventory */}
      <h2 className="text-xl font-semibold mb-2">📦 Book Inventory</h2>
      <ul className="mb-6">
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author} — Stock: {book.stock}
          </li>
        ))}
      </ul>

      {/* Borrower List */}
      <h2 className="text-xl font-semibold mb-2">👥 Borrowed Books</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.name}</strong> borrowed:{" "}
            {user.borrowedBooks.map((book) => book.title).join(", ") || "None"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;