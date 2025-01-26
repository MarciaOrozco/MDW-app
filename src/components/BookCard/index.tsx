import React from "react";
import { Link } from "react-router-dom";
import { Book } from "../../types/books";
import nocover from "../../assets/nocover.png";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link
      to={`/books/${book._id}`}
      className="bg-white shadow-md rounded-lg overflow-hidden border flex flex-col items-center p-4 hover:shadow-lg transition-shadow duration-300 "
    >
      <img
        src={book.image ? book.image : nocover}
        alt={book.name}
        className="w-full h-64 object-contain rounded-lg"
      />
      <h2 className="text-lg font-bold text-gray-800 mt-4 text-center">
        {book.name}
      </h2>
      <p className="text-gray-600 italic text-sm text-center">
        by {book.author}
      </p>
    </Link>
  );
};

export default BookCard;
