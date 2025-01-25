import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../types/books";
import api from "../config/axios";

interface BooksState {
  list: Book[];
  loading: boolean;
  error: string | undefined;
}

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  const response = await api.get("/books");
  return response.data.data;
});

const initialState: BooksState = {
  list: [],
  loading: false,
  error: undefined,
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = initialState.error;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = initialState.loading;
        state.list = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = initialState.loading;
        state.list = initialState.list;
        state.error = action.error.message;
      });
  },
});

export const reducer = slice.reducer;

export default reducer;
