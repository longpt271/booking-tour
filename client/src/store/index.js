import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './api';
import authReducer from './auth';
import cartReducer from './cart';
import checkoutReducer from './checkout';
import toastReducer from './toast';

// Tạo Redux store
const store = configureStore({
  reducer: {
    api: apiReducer,
    auth: authReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    toast: toastReducer,
  },
});

export default store;
