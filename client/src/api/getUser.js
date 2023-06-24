import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//1.4 회원 정보 조회
const URL = process.env.REACT_APP_EC2_URL;

export  const fetchUser = createAsyncThunk('users/fetchUser', async (userid) => {
  const url = `${URL}/users/${userid}`;
  const token = localStorage.getItem('jwtToken');

  const response = await axios.get(url, {
    headers: {
      Authorization: token
    },
  })
  
  try {
    if (response.status >= 200 && response.status < 300)
    return response.data; 
  } 
  catch (error) {
    return error;
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {}