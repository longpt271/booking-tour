import { createSlice } from '@reduxjs/toolkit';

// Tạo state mặc định
const initialDarkModeState = {
  isDarkMode: false,
};

// Tạo Slice darkMode
const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialDarkModeState,
  reducers: {
    SHOW_darkMode(state) {
      state.isDarkMode = true;
    },
    HIDE_darkMode(state) {
      state.isDarkMode = false;
    },
  },
});

// Phương thức tạo actions
export const darkModeActions = darkModeSlice.actions;

export default darkModeSlice.reducer;
