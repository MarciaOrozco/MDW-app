import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, deleteBookById } from "../../slices/books";
import { useDispatch, useSelector } from "../../store/store";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../config/firebase";
import BookDetailCard from "../../components/BookDetailCard";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const {
    selectedBook: book,
    loading,
    error,
  } = useSelector((state) => state.reducer.books);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    if (id) {
      dispatch(getBookById(id));
    }

    return () => unsubscribe();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (id) {
      await dispatch(deleteBookById(id));
      navigate("/books");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-book/${id}`);
  };

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
      <BookDetailCard book={book} />

      <div className="flex flex-wrap gap-4 mt-8">
        {user && (
          <>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-[#608297] text-white font-semibold rounded-lg shadow-md hover:bg-[#537c95] transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300"
            >
              Delete
            </button>
          </>
        )}
      </div>

      {showModal && (
        <DeleteConfirmationModal
          onConfirm={() => {
            handleDelete();
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BookDetailsPage;
