import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuotes = createAsyncThunk('quotes/getQuotes', async ()=> {
  const res = await axios(`https://www.breakingbadapi.com/api/quotes`);
  return res.data;
})

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    sayings: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sayings = action.payload;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
})

export default quotesSlice.reducer;