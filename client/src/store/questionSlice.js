import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 'question 입니다.'
}

const questionSilce = createSlice({
    name: 'question',
    initialState,
    reducers: {

    }
})

export default questionSilce;