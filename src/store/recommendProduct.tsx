// Redux slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const mySlice = createSlice({
  name: "mySlice",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  mySlice.actions;

export const fetchData = () => async (dispatch: any) => {
  dispatch(fetchDataStart());

  try {
    // Fetch data from database using a client library like `mongodb` or `mongoose`
    // const data =
    await // Dispatch a success action with the returned data as payload
    dispatch(fetchDataSuccess(""));
  } catch (error: any) {
    // Dispatch a failure action with the error message as payload
    dispatch(fetchDataFailure(error.message));
  }
};

export default mySlice.reducer;
