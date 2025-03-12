import { createSlice } from '@reduxjs/toolkit';
import stockData from '../data/stockData.json';

const initialState = {
  topGainers: [],
  topLosers: [],
  loading: false,
  error: null,
};

export const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    fetchStocksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStocksSuccess: (state, action) => {
      state.topGainers = action.payload.topGainers;
      state.topLosers = action.payload.topLosers;
      state.loading = false;
    },
    fetchStocksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStocksStart, fetchStocksSuccess, fetchStocksFailure } = stocksSlice.actions;

// Thunk to load stock data
export const fetchStocks = () => async (dispatch) => {
  try {
    dispatch(fetchStocksStart());
    // In a real app, this would be an API call
    // For now, we'll use our mock data
    dispatch(fetchStocksSuccess(stockData));
  } catch (error) {
    dispatch(fetchStocksFailure(error.message));
  }
};

export default stocksSlice.reducer;