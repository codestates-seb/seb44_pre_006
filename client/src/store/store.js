import { configureStore } from '@reduxjs/toolkit';
import memberSlice from './memberSlice'
import answerSlice from './AnswerSlice';
import qustionSlice from './qustionSlice';

  const store = configureStore({
    reducer: {
      member: memberSlice.reducer,
      answer: answerSlice.reducer,
      qustion: qustionSlice.reducer,
    }
  });

  export default store;