import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("auth/login/", params, {
      skipAuthorization: true,
    });
    return data;
  },
);

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async () => {
  const { data } = await axios.get("me/");
  return data;
});

export const fetchRefresh = createAsyncThunk(
  "auth/fetchRefresh",
  async (token) => {
    const { data } = await axios.post("auth/refresh_token/", token);
    return data;
  },
);

export const fetchDeleteAccount = createAsyncThunk(
  "auth/fetchDeleteAccount",
  async (id) => {
    const { data } = await axios.delete(`me/delete/${id}`);
    return data;
  },
);

export const fetchOtherUser = createAsyncThunk(
  "auth/fetchOtherUser",
  async (id) => {
    const { data } = await axios.get(`users/${id}/`);
    return data;
  },
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("auth/reg/", params, {
      skipAuthorization: true,
    });
    return data;
  },
);

const initialState = {
  data: null,
  user: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = "loading";
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = 'ok';
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });

    builder.addCase(fetchOtherUser.pending, (state) => {
      state.status = "loading";
      state.user = null;
    });
    builder.addCase(fetchOtherUser.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
    });
    builder.addCase(fetchOtherUser.rejected, (state) => {
      state.status = "error";
      state.user = null;
    });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectIsAuthStatus = (state) => state.auth.status;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
