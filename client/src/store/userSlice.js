import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../api/getUser';
import { fetchDeleteUser } from '../api/deleteUser';

const initialState = {
  data: {
    memberId: null,
    email: '',
    name: '',
    admin: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser(state) {
      state.data.memberId = null;
      state.data.email = '';
      state.data.name = '';
      state.data.admin = false;
    },
     setUser(state, action) {
        state.data.name = action.payload;
     }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data.memberId = action.payload.data.memberId;
        state.data.email = action.payload.data.email;
        state.data.name = action.payload.data.name;
        if (action.payload.data.email === process.env.REACT_APP_ADMIN_ID)
          state.data.admin = true;
      })
      // fetchDeleteUser
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        state.data.memberId = null;
        state.data.email = '';
        state.data.name = '';
        state.data.admin = false;
      })
      .addCase(fetchDeleteUser.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default userSlice;
export const { resetUser, setUser } = userSlice.actions;
  