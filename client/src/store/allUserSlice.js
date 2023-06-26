import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUser } from '../api/getAllUser';

const initialState = {
  status: 'loading',
  users: [],
  error: null,
};

const allUserSlice = createSlice({
  name: 'alluser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.users = action.payload.data;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export default allUserSlice;
