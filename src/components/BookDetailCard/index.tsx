import React from "react";
import { Book } from "../../types/books";
import nocover from "../../assets/nocover.png";
import { useNavigate } from "react-router-dom";

interface BookDetailCardProps {
  book: Book;
}

const BookDetailCard: React.FC<BookDetailCardProps> = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center items-center p-8">
        <img
          src={book.image ? book.image : nocover}
          alt={book.name}
          className="w-full max-w-xs h-auto object-contain shadow-md"
        />
      </div>

      <div className="flex flex-col justify-center p-6">
        <h1 className="text-3xl font-bold text-gray-800">{book.name}</h1>
        <h2 className="text-lg text-gray-600 mt-2 italic">by {book.author}</h2>
        <p className="text-gray-700 mt-4 leading-relaxed">{book.description}</p>

        <div className="border-t border-gray-200 mt-6 pt-4">
          <p className="text-gray-800">
            <span className="font-bold">Price:</span> ${book.price}
          </p>
          <p className="text-gray-500 text-sm mt-4">
            {book.isAvailable
              ? "Available in our inventory. Order now!"
              : "Currently unavailable, but check back soon!"}
          </p>
        </div>
        <div className="flex justify-end mt-auto">
          <button
            onClick={() => navigate("/books")}
            className="px-4 py-2 bg-[#b67e87] text-white font-semibold rounded-lg shadow-md hover:bg-[#b9757f] transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailCard;
