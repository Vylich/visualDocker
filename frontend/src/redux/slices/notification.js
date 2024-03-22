import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'notifications',
  initialState: {
    unreadMessages: [],
    unreadCount: 0,
    notificationsCount: 0,
    notificationsAll: {}
  },
  reducers: {
    updateUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
    addUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
    addNotificationsAll(state, action) {
      state.notificationsAll = action.payload;
    },
    addNotificationsCount(state, action) {
      state.notificationsCount = action.payload;
    },
    removeNotificationsCount(state) {
      state.notificationsCount = 0;
    },
    incrementUnreadCount(state) {
      state.unreadCount += 1;
    },
    addUnreadMessage(state, action) {
      state.unreadMessages.push(action.payload);
    },
    removeReadMessage(state, action) {
      state.unreadMessages = state.unreadMessages.filter(message => message.name !== action.payload);
    },
    clearMessages(state) {
      state.unreadMessages = [];
    },
  },
});

export const { addUnreadMessage, removeReadMessage, clearMessages, incrementUnreadCount, updateUnreadCount, addUnreadCount, addNotificationsCount, addNotificationsAll, removeNotificationsCount } = messagesSlice.actions;

export const notifReducer =  messagesSlice.reducer;