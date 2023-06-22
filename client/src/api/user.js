import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//유저 id를 받아 정보를 받는 api
const URL = process.env.REACT_APP_EC2_URL;

export  const fetchUser = createAsyncThunk('users/fetchUser', async (userid) => {
  const url = `${URL}/user/${userid}`;
  const token = localStorage.getItem('jwtToken');
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token, 
    },
  });
  return response.data;
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {}