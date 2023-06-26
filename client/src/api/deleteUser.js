import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// 1.7. 회원 탈퇴
const URL = process.env.REACT_APP_EC2_URL;

export const fetchDeleteUser = createAsyncThunk(
  'user/fetchDeleteUser',
  async ({ memberId }, { rejectWithValue }) => {
    console.log(memberId);
    const url = `${URL}/users/${memberId}`;
    const token = localStorage.getItem('jwtToken');

    const response = await axios.delete(url, {
      headers: { Authorization: token },
    });

    console.log(response.data);

    try {
      if (response.status >= 200 && response.status < 300) return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const emptyObject = {};
export default emptyObject;
