const fs = require("node:fs/promises");
const { NotFoundError } = require("../util/errors");
const { json } = require("body-parser");

const readData = async () => {
  const data = await fs.readFile(__dirname + "/books.json", "utf8");
  return JSON.parse(data, null, 2);
};

const readBorrowedBooksData = async () => {
  const data = await fs.readFile(__dirname + "/borrowedBooks.json", "utf8");
  return JSON.parse(data, null, 2);
};

const writeData = async (booksData) => {
  await fs.writeFile(
    __dirname + "/books.json",
    JSON.stringify(booksData, null, 2)
  );
};

const updatedBorrowedBooksData = async (bookData) => {
  await fs.writeFile(
    __dirname + "/borrowedBooks.json",
    JSON.stringify(bookData, null, 2)
  );
};

const getAllBooks = async () => {
  const booksData = await readData();

  if (!booksData.books) {
    throw new NotFoundError("No Books Found!");
  }
  return booksData.books;
};

const fetchBorrowedBooks = async () => {
  const booksData = await readBorrowedBooksData();

  if (!booksData.borrowedBooks) {
    throw new NotFoundError("No borrowed books data Found!");
  }

  return booksData.borrowedBooks;
};

const getBookById = async (bookId) => {
  const booksData = await getAllBooks();
  if (!booksData) {
    throw new NotFoundError("No Books Found!");
  }

  const index = booksData.findIndex(
    (book) => book.id.toString() === bookId.toString()
  );
  const book = booksData[index];
  return book;
};

const borrowBooks = async (bookId, bookObj) => {
  const booksData = await getAllBooks();
  const borrowedBooksData = await fetchBorrowedBooks();

  if (!booksData) {
    throw new NotFoundError("No Books Found!");
  }

  const index = booksData.findIndex(
    (book) => book.id.toString() === bookId.toString()
  );

  const bookIndex = borrowedBooksData?.findIndex(
    (book) => book?.id === +bookId
  );

  if (bookIndex !== -1) {
    borrowedBooksData[bookIndex] = {
      ...borrowedBooksData[bookIndex],
      stock: borrowedBooksData[bookIndex].stock + 1,
    };
  } else {
    const updatedBooks = {
      ...booksData[index],
      stock: booksData[index]?.stock - bookObj?.stock,
    };
    borrowedBooksData.push(updatedBooks);
  }

  booksData[index] = { ...booksData[index], stock: booksData[index].stock - 1 };

  const updatedBooks = [...booksData];

  await updatedBorrowedBooksData({ borrowedBooks: borrowedBooksData });
  await writeData({ books: updatedBooks });
  return updatedBooks;
};

exports.getAllBooks = getAllBooks;
exports.borrowBooks = borrowBooks;
exports.fetchBorrowedBooks = fetchBorrowedBooks;
