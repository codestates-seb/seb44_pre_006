import { createSlice } from '@reduxjs/toolkit';

const  initialState = {
  data : {
    memberId : 1,
    email : "jeein@gmail.com",
    name : "jeein Park"
  }
}

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
      setMember: (state, action) => {
        state = action.payload
      },
      setName: (state, action) => {
        state.name = action.payload
      },
    }
  });

export default memberSlice;
export const { setMember, setName } = memberSlice.actions;
  