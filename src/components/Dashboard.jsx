import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/');
      return;
    }
    loadBooks();
  }, [navigate]);

  const loadBooks = () => {
    const booksData = JSON.parse(localStorage.getItem('books') || '[]');
    setBooks(booksData);
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const booksData = JSON.parse(localStorage.getItem('books') || '[]');
    const newBookData = {
      ...newBook,
      id: Date.now().toString()
    };
    booksData.push(newBookData);
    localStorage.setItem('books', JSON.stringify(booksData));
    setBooks(booksData);
    setNewBook({
      title: '',
      author: '',
      price: '',
      quantity: ''
    });
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedBooks = books.map(book => 
      book.id === editingBook.id ? editingBook : book
    );
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    setEditingBook(null);
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleChange = (e) => {
    if (editingBook) {
      setEditingBook({
        ...editingBook,
        [e.target.name]: e.target.value
      });
    } else {
      setNewBook({
        ...newBook,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Bookshop Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="add-book-form">
        <h3>Add New Book</h3>
        <form onSubmit={handleAddBook}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={newBook.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={newBook.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newBook.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newBook.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Book</button>
        </form>
      </div>

      <div className="books-list">
        <h3>Book Inventory</h3>
        {books.map(book => (
          <div key={book.id} className="book-card">
            {editingBook?.id === book.id ? (
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    value={editingBook.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="author"
                    value={editingBook.author}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="price"
                    value={editingBook.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="quantity"
                    value={editingBook.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="button-group">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h4>{book.title}</h4>
                <p>Author: {book.author}</p>
                <p>Price: ${book.price}</p>
                <p>Quantity: {book.quantity}</p>
                <div className="book-actions">
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;