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
      });
  },
});

export const reducer = slice.reducer;

export default reducer;
