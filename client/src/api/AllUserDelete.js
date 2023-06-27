import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = process.env.REACT_APP_EC2_URL;

export const fetchDeleteAllUser = createAsyncThunk(
  'user/fetchDeleteAllUser',
  async (_, { rejectWithValue }) => {
    const url = `${URL}/users`;
    const token = localStorage.getItem('jwtToken');

    const response = await axios.delete(url, {
      headers: { Authorization: token },
    });

    try {
      if (response.status >= 200 && response.status < 300){
        console.log("전부 삭제!!", response)
        return response.data;
      } 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const emptyObject = {};
export default emptyObject;
