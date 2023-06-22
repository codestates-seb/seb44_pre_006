import { configureStore } from '@reduxjs/toolkit';
import memberSlice from './memberSlice'
import answerSlice from './answerSlice';
import questionSlice from './questionSlice';

  const store = configureStore({
    reducer: {
      member: memberSlice.reducer,
      answer: answerSlice.reducer,
      question: questionSlice.reducer,
    }
  });

  export default store;