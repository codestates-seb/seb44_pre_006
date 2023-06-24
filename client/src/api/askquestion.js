import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_EC2_URL;

export const fetchAskQuestions = createAsyncThunk(
  "askquestions/fetchAskQuestions",
  async (title, content) => {
    const url = `${BASE_URL}/questions/ask`;
    const token = localStorage.getItem("jwtToken");

    const response = await axios
      .post(
        url,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .catch((error) => {
        console.error("실패", error);
      });
    console.log(response.data);
    return response.data;
  }
);

const emptyObject = {};
export default emptyObject;
