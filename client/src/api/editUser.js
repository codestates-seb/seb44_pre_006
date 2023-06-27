import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//1.3 회원 정보 수정
const URL = process.env.REACT_APP_EC2_URL;

export const fetchEditUser = createAsyncThunk(
  "users/fetchEditUser",
  async ({ memberId, names, passwords }) => {
    const url = `/users/${memberId}`;
    const token = localStorage.getItem("jwtToken");

    const response = await axios.patch(
      url,
      { memberId: memberId, name: names, password: passwords },
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
