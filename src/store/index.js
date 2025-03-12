import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './stocksSlice';
import companyReducer from './companySlice';

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    company: companyReducer,
  },
});