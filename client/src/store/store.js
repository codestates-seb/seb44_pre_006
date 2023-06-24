import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import answerSlice from "./answerSlice";
import questionSlice from "./questionSlice";
import askquestionSlice from "./askquestionSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    answer: answerSlice.reducer,
    question: questionSlice.reducer,
    askquestion: askquestionSlice.reducer,
  },
});

export default store;
