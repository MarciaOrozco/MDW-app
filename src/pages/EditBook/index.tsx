import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, editBookById } from "../../slices/books";
import { useDispatch, useSelector } from "../../store/store";
import BookDetailCard from "../../components/BookDetailCard";

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedBook: book,
    loading,
    error,
  } = useSelector((state) => state.reducer.books);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    author: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getBookById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name,
        description: book.description,
        price: book.price.toString(),
        image: book.image,
        author: book.author,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const updatedBook = {
        ...formData,
        price: parseFloat(formData.price),
      };
      await dispatch(editBookById({ id, updatedBook }));
      navigate(`/books/${id}`);
    }
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

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 text-stone-700 shadow-lg rounded-lg p-8 mt-8 max-w-lg w-full font-mono"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Book</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>

        <button
          type="submit"
          className="w-full hover:bg-[#d1919b]  bg-[#b9757f] text-white font-bold py-2 px-4 rounded-lg transition duration-300 "
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
