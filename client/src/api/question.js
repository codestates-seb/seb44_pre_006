import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_EC2_URL;

export const fetchAllQuestions = createAsyncThunk(
  `questions/fetchAllQuestions`,
  async ({currentPage, postsPerPage}, { rejectWithValue }) => {
    const url = `${BASE_URL}/questions?size=10000&page=${currentPage}`;
    const response = await axios.get(url);

    console.log(response);

    try {
      if (response.status >= 200 && response.status < 300) {
        const fetchedAllQuestions = response.data;
        return fetchedAllQuestions;
      } 
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const emptyObject = {};
export default emptyObject;