import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  hostData: [],
  searchData: [],
  pastData: [],
  hostSearchData: {
    completed: [],
    cancelled: [],
    approved: [],
  },
  status: 'idle',
};

export const fetchHistoryBooking = createAsyncThunk(
  'historyBooking,fetchHistoryBooking',
  async ({ userId }) => {
    const res = await axios.get(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_BOOKING}/customer_bookings?limit=100&page=1&customer_id=${userId}`
    );
    return res.data.items.reverse();
  }
);

export const deleteHistoryBooking = createAsyncThunk(
  'historyBooking,deleteHistoryBooking',
  async ({ itemId }) => {
    await axios.post(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_BOOKING}/cancel_booking/${itemId}`
    );

    return itemId;
  }
);

export const completeHistoryBooking = createAsyncThunk(
  'historyBooking,completeHistoryBooking',
  async ({ itemId }) => {
    await axios.post(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_BOOKING}/change_completed_booking/${itemId}`
    );

    return itemId;
  }
);

export const fetchHostHistoryBooking = createAsyncThunk(
  'historyBooking,fetchHostHistoryBooking',
  async ({ userId }) => {
    const res = await axios.get(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_BOOKING}/host_bookings?limit=100&page=1&host_id=${userId}`
    );
    return res.data.items.reverse();
  }
);

export const historyBookingSlice = createSlice({
  name: 'historyBooking',
  initialState,
  reducers: {
    addSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    addSearchPastData: (state, action) => {
      state.pastData = action.payload;
    },
    addHostSearchData: (state, action) => {
      state.hostSearchData.approved = action.payload;
    },
    addHostSeachCancelled: (state, action) => {
      state.hostSearchData.completed = action.payload;
    },
    addHostSearchRejected: (state, action) => {
      state.hostSearchData.cancelled = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHistoryBooking.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoryBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          const approvedData = action.payload.filter(
            (item) => item.status === 'approved'
          );
          const pastData = action.payload.filter(
            (item) => item.status !== 'approved' && item.status !== 'pending'
          );

          state.data = action.payload;
          state.searchData = approvedData;
          state.pastData = pastData;
        }
      })
      .addCase(fetchHistoryBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteHistoryBooking.fulfilled, (state, action) => {
        const newData = state.searchData.filter(
          (item) => item.id !== action.payload
        );
        const newPastHostdata = state.hostSearchData.approved.filter(
          (item) => item.id !== action.payload
        );

        alert('Delete Succesfully');
        state.searchData = newData;
        state.hostSearchData.approved = newPastHostdata;
      })
      .addCase(completeHistoryBooking.fulfilled, (state, action) => {
        const newData = state.searchData.filter(
          (item) => item.id !== action.payload
        );
        const newPastHostdata = state.hostSearchData.approved.filter(
          (item) => item.id !== action.payload
        );
        alert('Completed Succesfully');
        state.searchData = newData;
        state.hostSearchData.approved = newPastHostdata;
      })

      .addCase(fetchHostHistoryBooking.fulfilled, (state, action) => {
        if (action.payload) {
          const completedData = action.payload.filter(
            (item) => item.status === 'approved'
          );
          const cancelledData = action.payload.filter(
            (item) => item.status !== 'approved' && item.status !== 'pending'
          );
          const rejectedData = action.payload.filter(
            (item) => item.status === 'cancelled'
          );
          state.hostData = action.payload;
          state.hostSearchData.approved = completedData;
          state.hostSearchData.completed = cancelledData;
          state.hostSearchData.cancelled = rejectedData;
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  addSearchData,
  addSearchPastData,
  addHostSearchData,
  addHostSeachCancelled,
  addHostSearchRejected,
} = historyBookingSlice.actions;

export default historyBookingSlice.reducer;

export const getAllHistory = (state) => state.historyBooking.data;

export const getApprovedHistory = (state) => {
  return state.historyBooking.data.filter(
    (hotel) => hotel.status === 'approved'
  );
};

export const getCompletedHistory = (state) => {
  return state.historyBooking.data.filter(
    (hotel) => hotel.status === 'completed'
  );
};

export const getCustomerPast = (state) => {
  return state.historyBooking.data.filter(
    (hotel) => hotel.status === 'cancelled'
  );
};

export const getSearch = (state) => state.historyBooking.searchData;
export const getPastData = (state) => state.historyBooking.pastData;

export const getHostCompleted = (state) =>
  state.historyBooking.hostSearchData.approved;
export const getHostCancelled = (state) =>
  state.historyBooking.hostSearchData.completed;
export const getHostRejected = (state) =>
  state.historyBooking.hostSearchData.cancelled;

export const getCancelledHistoryHost = (state) => {
  return state.historyBooking.hostData.filter(
    (hotel) => hotel.status !== 'approved'
  );
};

export const getRejectedHistoryHost = (state) => {
  return state.historyBooking.hostData.filter(
    (hotel) => hotel.status === 'cancelled'
  );
};
export const getCompletedHistoryHost = (state) => {
  return state.historyBooking.hostData.filter(
    (hotel) => hotel.status === 'approved'
  );
};
