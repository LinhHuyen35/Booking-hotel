import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  comments: [],
  status: "idle",
};

export const fetchHostHotel = createAsyncThunk(
  "hostHotel,fetchHostHotel",
  async ({ userId }) => {
    const res = await axios.get(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_HOTEL}/customer/${userId}/hotels?page=1&limit=20`
    );
    return res.data.items;
  }
);

export const fetchHostComments = createAsyncThunk(
  "hostHotel,fetchHostComments",
  async ({ hotelId }) => {
    const res = await axios.get(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_HOTEL}/hotel/${hotelId}/comments?page=1&limit=20&sort_asc=0`
    );
    console.log(hotelId);
    return res.data.items;
  }
);

export const hostHotelSlice = createSlice({
  name: "hostHotel",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHostComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchHostHotel.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.data = action.payload;
        }
      })
      .addCase(fetchHostHotel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchHostComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.comments = action.payload;
        }
      });
  },
});

export const {} = hostHotelSlice.actions;

export default hostHotelSlice.reducer;

export const getAllHotel = (state) => state.hostHotel.data;
export const getAllComments = (state) => state.hostHotel.comments;
