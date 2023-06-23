import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice'
import answerSlice from './answerSlice';
import questionSlice from './questionSlice';

  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      answer: answerSlice.reducer,
      question: questionSlice.reducer,
    }
  });

  export default store;