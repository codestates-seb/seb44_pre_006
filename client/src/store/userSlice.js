import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../api/user';

const  initialState = {
  data : {
    userId : 0,
    email : '',
    name : '',
    admin : false
  }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      resetUser(state) {
        state.data.userId = 0;
        state.data.email = '';
        state.data.name = '';
        state.data.admin = false;
      },
    },
    extraReducers : builder => { 
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.data.userId = action.payload.data.memberId;
        state.data.email = action.payload.data.email;
        state.data.name = action.payload.data.name;
        if(action.payload.data.email === process.env.REACT_APP_ADMIN_ID)
          state.data.admin = true;
      })
    }
  });

export default userSlice;
export const { resetUser } = userSlice.actions;
  