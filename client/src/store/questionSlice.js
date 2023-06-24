import { createSlice } from "@reduxjs/toolkit";
import { fetchAllQuestions } from "../api/question";

const initialState = {
  status: "loading",
  questions: [],
  error: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllQuestions.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.status = "succeed";
      state.questions = action.payload.data;
    });
    builder.addCase(fetchAllQuestions.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
  },
});

export default questionSlice;
