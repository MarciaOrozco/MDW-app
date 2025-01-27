import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/store";
import { addBook } from "../../slices/books";

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.reducer.books);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    author: "",
    isbn: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newBook = {
        ...formData,
        price: parseFloat(formData.price),
      };
      await dispatch(addBook(newBook));
      navigate("/books");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 font-mono">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 text-stone-700 shadow-lg rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add new book</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Book Name
          </label>
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

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>

        <button
          type="submit"
          className="w-full hover:bg-[#d1919b]  bg-[#b9757f] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
