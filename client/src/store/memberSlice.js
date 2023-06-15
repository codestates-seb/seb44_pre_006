import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
    name: 'member',
    initialState: null,
    reducers: {
      setMember: (state, action) => {
        return action.payload;
      },
    }
  });

export default memberSlice;
export const { setMember } = memberSlice.actions;
  