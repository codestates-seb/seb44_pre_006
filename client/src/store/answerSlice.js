import { createSlice } from '@reduxjs/toolkit';

const  initialState = {
  value: 'answer 입니다.'
}

const answerSlice = createSlice({
    name: 'answer',
    initialState,
    reducers:{

    }
})

export default answerSlice;