import { createSlice } from '@reduxjs/toolkit';
import { fetchAllQuestions } from '../api/question';
import { fetchSreachTitle } from '../api/sreachTitle';

const  initialState = {
  status: 'loading',
  questions: [],
  error: null,
}

const questionSlice = createSlice({
    name: 'qustion',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
      .addCase(fetchAllQuestions.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload.data;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchSreachTitle.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSreachTitle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload.data;
      })
      .addCase(fetchSreachTitle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
    }
})

export default questionSlice;