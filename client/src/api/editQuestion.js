import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//2.2 질문 수정
const URL = process.env.REACT_APP_EC2_URL;

export const fetchEditQuestion = createAsyncThunk(
  "question/fetchEditQuestion",
  async ({ questionId, titles, content }) => {
    const url = `/questions/posts/${questionId}/edit`;
    const token = localStorage.getItem("jwtToken");

    const response = await axios.patch(
      url,
      { title: titles, content: content },
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
