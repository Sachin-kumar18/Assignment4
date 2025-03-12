import { createSlice } from '@reduxjs/toolkit';
import companyData from '../data/companyData.json';

const initialState = {
  companyOverview: null,
  incomeStatement: null,
  loading: false,
  error: null,
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    fetchCompanyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCompanySuccess: (state, action) => {
      state.companyOverview = action.payload.companyOverview;
      state.incomeStatement = action.payload.incomeStatement;
      state.loading = false;
    },
    fetchCompanyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCompanyStart, fetchCompanySuccess, fetchCompanyFailure } = companySlice.actions;

// Thunk to load company data
export const fetchCompanyDetails = (ticker) => async (dispatch) => {
  try {
    dispatch(fetchCompanyStart());
    // In a real app, this would be an API call
    // For now, we'll use our mock data
    if (companyData[ticker]) {
      dispatch(fetchCompanySuccess(companyData[ticker]));
    } else {
      // If ticker isn't in our mock data, use IBM as a fallback
      dispatch(fetchCompanySuccess(companyData.IBM));
    }
  } catch (error) {
    dispatch(fetchCompanyFailure(error.message));
  }
};

export default companySlice.reducer;