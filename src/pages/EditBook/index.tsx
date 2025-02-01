import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, editBookById } from "../../slices/books";
import { useDispatch, useSelector } from "../../store/store";
import BookDetailCard from "../../components/BookDetailCard";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { addBookSchema } from "../AddBook/validation";

type FormValues = {
  name: string;
  author: string;
  description: string;
  price: number;
  image?: string;
  isbn: string;
  isAvailable: boolean;
};

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedBook: book,
    loading,
    error,
  } = useSelector((state) => state.reducer.books);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(addBookSchema),
  });

  useEffect(() => {
    if (id) {
      dispatch(getBookById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (book) {
      setValue("name", book.name);
      setValue("author", book.author);
      setValue("description", book.description);
      setValue("price", book.price);
      setValue("isbn", book.isbn);
      setValue("image", book.image || "");
      setValue("isAvailable", book.isAvailable || false);
    }
  }, [book, setValue]);

  const onSubmit = async (data: FormValues) => {
    if (id) {
      await dispatch(editBookById({ id, updatedBook: data }));
      navigate(`/books/${id}`);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!book) return <div className="text-center">Book not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <BookDetailCard book={book} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 text-stone-700 shadow-lg rounded-lg p-8 mt-8 max-w-lg w-full font-mono"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Book</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            {...register("name")}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Author</label>
          <input
            {...register("author")}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
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
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
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
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
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
            {...register("image")}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ISBN</label>
          <input
            type="text"
            {...register("isbn")}
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-200"
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
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
