import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMeRoute } from "../utils/APIRoutes";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    surname: "",
    avatar: "",
    roles: [],
  },
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk("user/fetchUserData", async (token) => {
  try{
    const response = await axios.get(getMeRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch(err) {
    console.log(err)
    throw err;
  }
  });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;