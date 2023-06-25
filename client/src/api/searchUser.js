import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_EC2_URL;

export const fetchSearchUser = createAsyncThunk(
  `user/fetchSearchUser`,
  async ({ currentPage, postsPerPage }, { rejectWithValue }) => {
    const url = `${BASE_URL}/users?page=${currentPage}&size=1000`;
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

// eslint-disable-next-line import/no-anonymous-default-export
export default {};