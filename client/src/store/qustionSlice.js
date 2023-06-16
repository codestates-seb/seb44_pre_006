import { createSlice } from '@reduxjs/toolkit';

const  initialState = {
  value: 'qustion 입니다.'
}

const qustionSlice = createSlice({
    name: 'qustion',
    initialState,
    reducers:{

    }
})

export default qustionSlice;