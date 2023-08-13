import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      if (state.data.length < 3) {
        state.data.push(action.payload);
        alert("Added to compare");
      } else {
        alert("Exceeded maximum number of items for comparison");
      }
    },
    removeFromCompare: (state, action) => {
      const removeItem = state.data.filter(
        (item) => item.id !== action.payload.id
      );
      alert("Remove from compare");

      state.data = removeItem;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCompare, removeFromCompare } = compareSlice.actions;

export default compareSlice.reducer;

export const getAllCompareData = (state) => state.compare.data;
