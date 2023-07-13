import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import toastReducer from './toast';
import darkModeReducer from './darkMode';

// Tạo Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
