import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../axios'

export const fetchFollowers = createAsyncThunk(
	'social/fetchFollowers',
	async id => {
		const { data } = await axios.get(`my_followers/${id}/`)
		return data
	}
)

export const fetchSubscriptions = createAsyncThunk(
	'social/fetchSubscriptions',
	async id => {
		const { data } = await axios.get(`my_subscriptions/${id}/`)
		return data
	}
)

export const fetchSubscribe = createAsyncThunk(
	'social/fetchSubscribe',
	async params => {
		const { data } = await axios.post(`subscribe/`, params)
		return data
	}
)

const initialState = {
	followers: {
		users: [],
		status: 'loading',
	},
	subscriptions: {
		users: [],
		status: 'loading',
	},
}

const socialSlice = createSlice({
	name: 'social',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
    builder.addCase(fetchFollowers.pending, (state) => {
      state.followers.users = [];
      state.followers.status = 'loading';
    }),
    builder.addCase(fetchFollowers.fulfilled, (state, action) => {
      state.followers.users = action.payload;
      state.followers.status = 'loaded';
    }),
    builder.addCase(fetchFollowers.rejected, (state) => {
      state.followers.users = [];
      state.followers.status = 'loaded';
    }),
		builder.addCase(fetchSubscriptions.pending, (state) => {
      state.subscriptions.users = [];
      state.subscriptions.status = 'loading';
    }),
    builder.addCase(fetchSubscriptions.fulfilled, (state, action) => {
      state.subscriptions.users = action.payload;
      state.subscriptions.status = 'loaded';
    }),
    builder.addCase(fetchSubscriptions.rejected, (state) => {
      state.subscriptions.users = [];
      state.subscriptions.status = 'loaded';
    })
  }
})

export const socialReducer = socialSlice.reducer
