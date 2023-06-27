import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import answerSlice from './answerSlice';
import questionSlice from './questionSlice';
import allUserSlice from './allUserSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    alluser: allUserSlice.reducer,
    answer: answerSlice.reducer,
    question: questionSlice.reducer,
  },
});

export default store;
