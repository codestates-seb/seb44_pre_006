import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://ec2-3-39-195-247.ap-northeast-2.compute.amazonaws.com:8080';
console.log(BASE_URL);

export const fetchAllQuestions = createAsyncThunk(
  `questions/fetchAllQuestions`,
  async (_, { rejectWithValue }) => {
    const url = `${BASE_URL}/questions?size=10&page=1`;
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