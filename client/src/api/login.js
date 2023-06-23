import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = process.env.REACT_APP_EC2_URL
export const fetchLogin = createAsyncThunk('login', async ({email, password, name}) => {
    const url = `${URL}/users/signup`;
    const reponse = await axios.post(url, {email, password, name});
    console.log(reponse.data);
    return reponse.data;
})

