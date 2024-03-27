import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const token = window.localStorage.getItem('access')
	const config = {}
	if (!token) {
		config.skipAuthorization = true
	}
	const { data } = await axios.get('/posts/', config)
	return data
})

export const fetchUserPosts = createAsyncThunk(
	'posts/fetchUserPosts',
	async id => {
		const { data } = await axios.get(`/users/${id}/my_posts`)
		return data
	}
)

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	const { data } = await axios.get('/tags')
	return data
})

export const fetchComments = createAsyncThunk(
	'posts/fetchComments',
	async () => {
		const { data } = await axios.get('/comments')
		return data
	}
)

export const fetchRemoveComment = createAsyncThunk(
	'posts/fetchRemoveComment',
	async id => axios.delete(`/comment/${id}`)
)

export const fetchRemovePost = createAsyncThunk(
	'posts/fetchRemovePost',
	async id => axios.delete(`/posts/${id}`)
)

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	userPosts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
	comments: {
		items: [],
		status: 'loading',
	},
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		removePostsState(state) {
			state.posts.items = []
		}
	},
	extraReducers: builder => {
			builder.addCase(fetchPosts.fulfilled, (state, action) => {
				state.posts.items = [...state.posts.items, ...action.payload];
				state.posts.status = 'loaded'
			}),
			builder.addCase(fetchPosts.rejected, state => {
				state.posts.items = []
				state.posts.status = 'loaded'
			}),
			builder.addCase(fetchTags.pending, state => {
				state.tags.items = []
				state.tags.status = 'loading'
			}),
			builder.addCase(fetchTags.fulfilled, (state, action) => {
				state.tags.items = action.payload
				state.tags.status = 'loaded'
			}),
			builder.addCase(fetchTags.rejected, state => {
				state.tags.items = []
				state.tags.status = 'loaded'
			}),
			builder.addCase(fetchRemovePost.pending, (state, action) => {
				state.posts.items = state.posts.items.filter(
					obj => obj._id !== action.meta.arg
				)
			}),
			builder.addCase(fetchComments.pending, state => {
				state.comments.items = []
				state.comments.status = 'loading'
			}),
			builder.addCase(fetchComments.fulfilled, (state, action) => {
				state.comments.items = action.payload
				state.comments.status = 'loaded'
			}),
			builder.addCase(fetchComments.rejected, state => {
				state.comments.items = []
				state.comments.status = 'loaded'
			})

		builder.addCase(fetchUserPosts.pending, state => {
			state.userPosts.items = []
			state.userPosts.status = 'loading'
		}),
			builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
				state.userPosts.items = action.payload
				state.userPosts.status = 'loaded'
			}),
			builder.addCase(fetchUserPosts.rejected, state => {
				state.userPosts.items = []
				state.userPosts.status = 'loaded'
			})
	},
})

export const { removePostsState } = postsSlice.actions;

export const postsReducer = postsSlice.reducer
