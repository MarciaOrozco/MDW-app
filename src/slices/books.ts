import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../types/books";
import api from "../config/axios";

interface BooksState {
  list: Book[];
  loading: boolean;
  error: string | undefined;
  selectedBook: Book | null;
}

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  const response = await api.get("/books");
  return response.data.data;
});

export const getBookById = createAsyncThunk(
  "books/getBookById",
  async (id: string) => {
    const response = await api.get(`/books/${id}`);
    return response.data.data;
  }
);

export const deleteBookById = createAsyncThunk(
  "books/deleteBookById",
  async (id: string) => {
    await api.delete(`/books/${id}`);
    return id;
  }
);

export const editBookById = createAsyncThunk(
  "books/editBookById",
  async ({ id, updatedBook }: { id: string; updatedBook: Partial<Book> }) => {
    const response = await api.put(`/books/${id}`, updatedBook);
    return response.data.data;
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook: Partial<Book>) => {
    const response = await api.post("/books", newBook);
    return response.data.data;
  }
);

const initialState: BooksState = {
  list: [],
  loading: false,
  error: undefined,
  selectedBook: null,
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.selectedBook = null;
      })
      .addCase(deleteBookById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(
          (book) => book._id !== Number(action.payload)
        );
      })
      .addCase(deleteBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editBookById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(editBookById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload;
        state.list = state.list.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        );
      })
      .addCase(editBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, action.payload];
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;

export default reducer;
