import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 1.6. 전체 회원 정보 조회
const URL = process.env.REACT_APP_EC2_URL;

export const fetchAllUser = createAsyncThunk(
  `user/fetchAllUser`,
  async ({ currentPage, postsPerPage }, { rejectWithValue }) => {
    const url = `/users?page=${currentPage}&size=100`;
    const response = await axios.get(url);

    try {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
