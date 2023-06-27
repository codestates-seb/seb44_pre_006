import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_EC2_URL;

export const fetchAskQuestions = createAsyncThunk(
  "questions/fetchAskQuestions",
  async ({titles, contents}) => {
    const url = `${URL}/questions/ask`;
    const token = localStorage.getItem("jwtToken");

    const response = await axios
      .post(
        url,
        {title: titles, content: contents},
        {headers: {Authorization: token}}
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
