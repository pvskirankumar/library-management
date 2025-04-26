export const BookCard = ({ book, handleAddBook }) => {
  let status;

  if (book.stock > 0) {
    status = (
      <p className="text-green-600 text-sm">
        <strong>Available:</strong> {book.stock}
      </p>
    );
  } else {
    status = <p className="text-red-600 text-sm">Not Available</p>;
  }

  const updateBook = () => {
    const updatedBookObj = {
      ...book,
      stock: book.stock - 1,
    };

    handleAddBook(updatedBookObj);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{book.title}</h3>
      <p className="text-gray-700 mb-1">
        <strong>Author:</strong> {book.author}
      </p>
      {status}
      <div className="mt-4">
        <button
          type="button"
          className="text-white bg-green-700
         hover:bg-green-800 focus:outline-none focus:ring-4
          focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2
           dark:bg-green-600
            dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={updateBook}
          disabled={book.stock === 0}
        >
          Add
        </button>
        <button
          type="button"
          className="text-white
         bg-red-700
         hover:bg-red-800 focus:outline-none focus:ring-4
         focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2
          dark:bg-red-600
           dark:hover:bg-red-700
           dark:focus:ring-red-900"
          disabled={book.stock === 0}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
