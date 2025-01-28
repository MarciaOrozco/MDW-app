import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { getBooks } from "../../slices/books";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard";

const BooksPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector((state) => state.reducer.books);

  useEffect(() => {
    if (!list.length) {
      dispatch(getBooks());
    }
  }, [dispatch, list]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/add-book")}
          className="px-4 py-2 bg-[#b67e87] text-white font-semibold rounded-lg shadow-md hover:bg-[#b9757f] transition duration-300"
        >
          Add New Book
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {list.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
