import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  connectionStatus: "",
};

export const connectToSocket = createAsyncThunk(
  "connectToSocket",
  async function() {
    return await socketClient.connect();
  },
);

export const disconnectFromSocket = createAsyncThunk(
  "disconnectFromSocket",
  async function() {
    return await socketClient.disconnect();
  },
);

export const sendMessage = createAsyncThunk('sendMessage', async function ({ message, username }) {
  return await socketClient.emit('chat', { message, handle: username });
});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectToSocket.pending, (state) => {
      state.connectionStatus = "connecting";
    });
    builder.addCase(connectToSocket.fulfilled, (state) => {
      state.connectionStatus = "connected";
    });
    builder.addCase(connectToSocket.rejected, (state) => {
      state.connectionStatus = "connection failed";
    });
    builder.addCase(disconnectFromSocket.pending, (state) => {
      state.connectionStatus = "disconnecting";
    });
    builder.addCase(disconnectFromSocket.fulfilled, (state) => {
      state.connectionStatus = "disconnected";
    });
    builder.addCase(disconnectFromSocket.rejected, (state) => {
      state.connectionStatus = "disconnection failed";
    });
    builder.addCase(sendMessage.pending, (state) => {
      state.messageStatus = "Sending";
    });
    builder.addCase(sendMessage.fulfilled, (state) => {
      state.messageStatus = "Sent successfully";
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.messageStatus = "Send failed";
    });
  },
});
export default appSlice.reducer;
