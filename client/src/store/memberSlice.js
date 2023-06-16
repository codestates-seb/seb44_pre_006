import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data :  {
        memberId : 1,
        email : "jeein1@gmail.com",
        name : "Jeein Park1"
      }
}

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
      setName: (state, action) => {
        const newnName = action.payload;
        state.data.name = newnName;
      },
    }
  });

export default memberSlice;
export const { setName } = memberSlice.actions;
  