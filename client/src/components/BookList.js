import { useEffect, useState } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const issueBook = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post("http://localhost:5000/api/issue", {
      user: user._id,
      book: bookId
    });

    alert("Book Issued 📚");
    fetchBooks();
  };

  // 🔍 SEARCH + FILTER
  const filteredBooks = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "ALL"
        ? true
        : filter === "AVAILABLE"
        ? book.available === true
        : book.available === false;

    return matchSearch && matchFilter;
  });

  return (
    <div className="mb-4">

      <h4 className="text-white mb-3">📚 Library Books</h4>

      {/* SEARCH + FILTER */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search books..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="ALL">All Books</option>
            <option value="AVAILABLE">Available</option>
            <option value="ISSUED">Issued</option>
          </select>
        </div>
      </div>

      {/* BOOK CARDS */}
      <div className="row">
        {filteredBooks.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">

            <div className="premium-card p-3 h-100">

              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
              />

              <h5 className="mt-3 text-white">{book.title}</h5>
              <p className="text-secondary">{book.author}</p>

              {book.available ? (
                <button
                  onClick={() => issueBook(book._id)}
                  className="btn btn-premium w-100"
                >
                  Issue Book
                </button>
              ) : (
                <button className="btn btn-secondary w-100" disabled>
                  Issued
                </button>
              )}

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default BookList;