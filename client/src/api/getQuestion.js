import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//2.4 단일 질문 조회
const URL = process.env.REACT_APP_EC2_URL;

const fetchGetQuestion = createAsyncThunk('question/fetchGetQuestion', async (questionId) => {
  const url = `${URL}/questions/${questionId}`;
  const response = await axios.get(url)
  
  try {
    if (response.status >= 200 && response.status < 300)
    return response.data; 
  } 
  catch (error) {
    return error;
  }
});

export default fetchGetQuestion