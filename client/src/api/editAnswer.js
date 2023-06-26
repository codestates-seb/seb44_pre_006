import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//3.2 답변 수정
const URL = process.env.REACT_APP_EC2_URL;

export const fetchEditAnswer = createAsyncThunk(
  "answer/fetchEditAnswer",
  async ({ answerId, content }) => {
    const url = `${URL}/asnwers/${answerId}`;
    const token = localStorage.getItem("jwtToken");

    const response = await axios.patch(
      url,
      { content: content },
      { headers: { Authorization: token } }
    );

    try {
      if (response.status >= 200 && response.status < 300) return response.data;
    } catch (error) {
      return error;
    }
  }
);

const emptyObject = {};
export default emptyObject;
