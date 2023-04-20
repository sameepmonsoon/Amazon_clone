// Redux slice
import { createSlice } from "@reduxjs/toolkit";
import { HTTPMethods } from "../Utils/HTTPMethods";

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

export function fetchRecommendedProduct() {
  return async function fetchProductThunk(dispatch: any) {
    dispatch(fetchDataStart());

    try {
      await HTTPMethods.get(`/recommendedproduct/get`)
        .then((res) => {
          dispatch(fetchDataSuccess(res.data));
        })
        .catch((err) => {
          console.log(err.message);
          dispatch(fetchDataFailure(err.message));
        });
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
    }
  };
}

export default mySlice.reducer;
