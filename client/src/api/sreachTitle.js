import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//2.6 제목 검색
const URL = process.env.REACT_APP_EC2_URL;

export  const fetchSreachTitle = createAsyncThunk('question/fetchSreachTitle', async (title) => {
  const url = `${URL}/questions/search?size=10&page=1&title=${title}`;

  const response = await axios.get(url)

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