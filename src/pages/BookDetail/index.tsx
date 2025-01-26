import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../../slices/books";
import { useDispatch, useSelector } from "../../store/store";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedBook: book,
    loading,
    error,
  } = useSelector((state) => state.reducer.books);

  useEffect(() => {
    if (id) {
      dispatch(getBookById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-red-500">{error}</h2>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-600">Book not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center p-8">
          <img
            src={book.image}
            alt={book.name}
            className="w-full max-w-xs h-auto object-contain shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center p-6">
          <h1 className="text-3xl font-bold text-gray-800">{book.name}</h1>
          <h2 className="text-lg text-gray-600 mt-2 italic">
            by {book.author}
          </h2>
          <p className="text-gray-500 text-sm mt-4"> some other text </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            {book.description}
          </p>

          <div className="border-t border-gray-200 mt-6 pt-4">
            <p className="text-gray-800">
              <span className="font-bold">price:</span> ${book.price}
            </p>
            <p className="text-gray-800">
              <span className="font-bold">language:</span> English
            </p>
            <p className="text-gray-500 text-sm mt-4">
              {book.isAvailable
                ? "currently available at our store"
                : "not available to purchase"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
      >
        go back
      </button>
    </div>
  );
};

export default BookDetail;
