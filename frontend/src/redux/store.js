import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';
import { socialReducer } from './slices/socialGraph';
import { notifReducer } from './slices/notification';
import {searchReducer} from './slices/search'



const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    social: socialReducer,
    notif: notifReducer,
    search: searchReducer,

  },
});

export default store;
