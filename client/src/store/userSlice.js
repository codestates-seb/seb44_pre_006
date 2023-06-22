import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../api/user';

const  initialState = {
  data : {
    userId : 0,
    email : '',
    name : '',
  }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers : builder => { 
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.userId = action.payload.memberId;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
    }
  });

export default userSlice;
  