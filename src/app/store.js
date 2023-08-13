import { configureStore } from "@reduxjs/toolkit";

import historyBookingReducer from "../features/booked/historyBookingSlice";
import compareReducer from "../features/compare/compareSlice";
import userReducer from "../features/userSlice";
import hostHotelReducer from "../features/hostHotelSlice";

export const store = configureStore({
  reducer: {
    historyBooking: historyBookingReducer,
    compare: compareReducer,
    user: userReducer,
    hostHotel: hostHotelReducer,
  },
});
