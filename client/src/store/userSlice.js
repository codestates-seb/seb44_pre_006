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
        state.data.userId = action.payload.data.memberId;
        state.data.email = action.payload.data.email;
        state.data.name = action.payload.data.name;
      })
    }
  });

export default userSlice;
  