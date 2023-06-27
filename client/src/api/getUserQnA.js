import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//1.5 회원 질문, 답변 정보 조회
const URL = process.env.REACT_APP_EC2_URL;

const fetchGetUserQnA = createAsyncThunk('user/fetchGetUserQnA', async (memberId) => {
  const url = `/users/getInfo/${memberId}`;
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

export default fetchGetUserQnA