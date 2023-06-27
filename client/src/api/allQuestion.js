import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 2.5. 전체 질문 조회(/question)
const URL = process.env.REACT_APP_EC2_URL;

export const fetchAllQuestions = createAsyncThunk(
  `question/fetchAllQuestions`,
  async ({currentPage, postsPerPage}, { rejectWithValue }) => {
    const url = `${URL}/questions?size=100&page=${currentPage}`;
    const response = await axios.get(url);

    try {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } 
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const emptyObject = {};
export default emptyObject;