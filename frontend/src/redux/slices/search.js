import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchedItems : []
  },
  reducers: {
		addSearch(state, action) {
			state.searchedItems = action.payload;
		},
		delSearch(state) {
			state.searchedItems = [];
		},
  },
});

export const { addSearch, delSearch } = searchSlice.actions;

export const searchReducer =  searchSlice.reducer;