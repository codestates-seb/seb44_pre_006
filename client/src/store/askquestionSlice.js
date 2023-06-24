import { createSlice } from "@reduxjs/toolkit";
import { fetchAskQuestions } from "../api/askquestion";

const initialState = {
  data: {
    title: "",
    content: "",
  },
};

const askquestionSlice = createSlice({
  name: "askquestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAskQuestions.fulfilled, (state, action) => {
      state.data.title = action.payload.data.title;
      state.data.content = action.payload.data.content;
    });
  },
});

export default askquestionSlice;
