import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem("darkMode") || "false"),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
