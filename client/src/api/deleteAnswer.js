import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//3.5. 답변 삭제
const URL = process.env.REACT_APP_EC2_URL;

export const fetchDeleteAnswer = createAsyncThunk(
  "answer/fetchDeleteAnswer",
  async ({ answerId }) => {
    const url = `/answers/${answerId}`;
    const token = localStorage.getItem("jwtToken");

    const response = await axios.delete(
      url,
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
