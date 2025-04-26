import { useEffect, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { BookCard } from "../components/bookCard";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const userObj = useRouteLoaderData("root");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const booksResp = fetch("http://localhost:3002/api/books/", {
        method: "get",
      });
      const data = await booksResp.then((resp) => resp.json());
      setBooks(data.books);
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (updatedBookObj) => {
    const response = fetch(
      `http://localhost:3002/api/books/borrow/${updatedBookObj.id}`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${userObj.token}`,
          "token-type": "google",
        },
        body: JSON.stringify(updatedBookObj),
      }
    );

    if ((await response).status === 401) {
      setErrorMessage("You are not authorized. Please login to proceed!");
      return;
    }

    if ((await response).status === 403) {
      setErrorMessage("Your Login session has been Expired. Please wait while we redirect to Login Page!");
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      setTimeout(() => navigate("/auth"), 3000);
      return;
    }

    const booksResp = await response.then((res) => res.json());
    console.log("booksResp= ", booksResp);
    if (booksResp.books.length === 0) {
      return;
    } else {
      setBooks(booksResp.books);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {errorMessage}
      {!errorMessage &&
        books.map((book) => (
          <BookCard key={book.id} book={book} handleAddBook={handleAddBook} />
        ))}
      {errorMessage && errorMessage.message}
    </div>
  );
};

export default Books;
