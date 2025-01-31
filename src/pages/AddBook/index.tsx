/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/store";
import { addBook } from "../../slices/books";
import { joiResolver } from "@hookform/resolvers/joi";
import { addBookSchema } from "./validation";

type FormValues = {
  name: string;
  author: string;
  description: string;
  price: number;
  image?: string;
  isbn: string;
  isAvailable: boolean;
};

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.reducer.books);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(addBookSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const newBook = {
        ...data,
        price: parseFloat(data.price.toString()),
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
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 text-stone-700 shadow-lg rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add new book</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Book Name
          </label>
          <input
            {...register("name")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors?.name ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-rose-200`}
          />
          {errors?.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Author</label>
          <input
            {...register("author")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors?.author ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-rose-200`}
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors?.description ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-rose-200`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            {...register("price")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors?.price ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-rose-200`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            {...register("image")}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ISBN</label>
          <input
            type="text"
            {...register("isbn")}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors?.isbn ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-rose-200`}
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm">{errors.isbn.message}</p>
          )}
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            {...register("isAvailable")}
            className="mr-2"
          />
          <label className="text-gray-700 font-medium">Available</label>
        </div>

        <button
          type="submit"
          className="w-full hover:bg-[#d1919b] bg-[#b9757f] text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
