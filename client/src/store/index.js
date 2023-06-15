import { configureStore } from '@reduxjs/toolkit';
import memberSlice from './memberSlice'

  const store = configureStore({
    reducer: {
      member: memberSlice.reducer
    }
  });

  export default store;