import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice'
import answerSlice from './answerSlice';
import qustionSlice from './qustionSlice';

  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      answer: answerSlice.reducer,
      qustion: qustionSlice.reducer,
    }
  });

  export default store;