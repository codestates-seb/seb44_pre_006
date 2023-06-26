import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 2.5.전체 질문 조회(/home)
const BASE_URL = process.env.REACT_APP_EC2_URL;

export const fetchTopQuestions = createAsyncThunk(
  `question/fetchTopQuestions`,
  async (_, { rejectWithValue }) => {
    const url = `${BASE_URL}/questions?size=100&page=1`;
    const response = await axios.get(url);

    try {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        return response.data;
      } 
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const emptyObject = {};
export default emptyObject;