import { configureStore } from '@reduxjs/toolkit';
import memberSlice from './memberSlice'
import questionSilce from './questionSlice';
import answerSilce from './answerSlice';

  const store = configureStore({
    reducer: {
      member: memberSlice.reducer,
      answer: answerSilce.reducer,
      qustion: questionSilce.reducer
    }
  });

  export default store;
  