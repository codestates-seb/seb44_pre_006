import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//3.1 답변 등록
const URL = process.env.REACT_APP_EC2_URL;

export  const fetchSetAnswer = createAsyncThunk('answer/fetchSetAnswer', async ({questionId,answerContent}) => {
  const url = `${URL}/answers/${questionId}`;
  const token = localStorage.getItem('jwtToken');

  const response = await axios.post(url, 
    { content: answerContent }, { headers: {Authorization: token}})
  
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