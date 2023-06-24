import { createSlice } from '@reduxjs/toolkit';
import { fetchAllQuestions } from '../api/question';
import { fetchSreachTitle } from '../api/sreachTitle';

const initialState = {
  status: "loading",
  questions: [],
  error: null,
};

const questionSlice = createSlice({
    name: 'qustion',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
      //fetchAllQuestions
      .addCase(fetchAllQuestions.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.questions = action.payload.data;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      //fetchSreachTitle
      .addCase(fetchSreachTitle.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSreachTitle.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.questions = action.payload.data;
      })
      .addCase(fetchSreachTitle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
    }
})

export default questionSlice;
