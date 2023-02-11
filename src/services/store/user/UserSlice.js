import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { setCookie, getCookie, deleteCookie } from "../../utils";

const initialState = {
  user: null,
  token: null,
  updateUser: {
    status: "idle",
    error: null,
  },
  register: {
    status: "idle",
    error: null,
  },
  login: {
    status: "idle",
    error: null,
  },
  logout: {
    status: "idle",
    error: null,
  },
  resetPassword: {
    status: "idle",
    error: null,
  },
  confirmResetPassword: {
    status: "idle",
    error: null,
  },
  getUser: {
    status: "idle",
    error: null,
  },
  status: "idle",
  error: null,
};

export const getUser = createAsyncThunk(
  "user/get",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.get("auth/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.patch("auth/user", { ...params });
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/register", { ...user });
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/login", { ...user });
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = getCookie("refreshToken");
      const response = await api.post("auth/logout", {
        token: refreshToken,
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.post("password-reset", { ...params });
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmResetPassword = createAsyncThunk(
  "user/confirmResetPassword",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.post("password-reset/reset", { ...params });
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state, action) => {
        state.register.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.register.status = "succeeded";
        state.user = action.payload.user;
        localStorage.setItem("accessToken", action.payload.accessToken);
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.register.status = "failed";
        state.register.error =
          action.payload?.message ||
          "Что-то пошло не так. Повторите попытку позже.";
      })
      .addCase(login.pending, (state, action) => {
        state.login.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.status = "succeeded";
        state.user = action.payload.user;
        const accessToken = action.payload.accessToken.split("Bearer ")[1];
        localStorage.setItem("accessToken", accessToken);
        setCookie("refreshToken", action.payload.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.error =
          action.payload?.message ||
          "Что-то пошло не так. Повторите попытку позже.";
      })
      .addCase(logout.pending, (state, action) => {
        state.logout.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logout.status = "succeeded";
        state.user = null;
        deleteCookie("refreshToken");
        localStorage.removeItem("accessToken");
      })
      .addCase(logout.rejected, (state, action) => {
        state.logout.status = "failed";
        state.logout.error =
          action.payload?.message ||
          "Что-то пошло не так. Повторите попытку позже.";
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.resetPassword.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPassword.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.status = "failed";
        state.resetPassword.error =
          action.payload?.message ||
          "Что-то пошло не так. Повторите попытку позже.";
      })
      .addCase(confirmResetPassword.pending, (state, action) => {
        state.confirmResetPassword.status = "loading";
      })
      .addCase(confirmResetPassword.fulfilled, (state, action) => {
        state.confirmResetPassword.status = "succeeded";
      })
      .addCase(confirmResetPassword.rejected, (state, action) => {
        state.confirmResetPassword.status = "failed";
        state.confirmResetPassword.error =
          action.payload?.message ||
          "Что-то пошло не так. Повторите попытку позже.";
      })
      .addCase(getUser.pending, (state, action) => {
        state.getUser.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.getUser.status = "succeeded";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUser.status = "failed";
        state.getUser.error =
          action.payload?.message ||
          "Что-то пошло не так. Повторите попытку позже.";
      })
      .addCase(updateUser.pending, (state, action) => {
        state.updateUser.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUser.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUser.status = "failed";
        state.updateUser.error =
          action.payload?.message ||
          "Что-то пошло не так. Повторите попытку позже.";
      });
  },
});

export const selectLastOrderNumber = (state) => state.orders.lastOrder.number;
export const selectCurrentUser = (state) => state.user.user;
export const selectRegisterStatus = (state) => state.user.register.status;
export const selectRegisterError = (state) => state.user.register.error;
export const selectLoginStatus = (state) => state.user.login.status;
export const selectLoginError = (state) => state.user.login.error;
export const selectLogoutStatus = (state) => state.user.logout.status;
export const selectLogoutError = (state) => state.user.logout.error;
export const selectResetPasswordStatus = (state) =>
  state.user.resetPassword.status;
export const selectResetPasswordError = (state) =>
  state.user.resetPassword.error;
export const selectConfirmResetPasswordStatus = (state) =>
  state.user.confirmResetPassword.status;
export const selectConfirmResetPasswordError = (state) =>
  state.user.confirmResetPassword.error;
export const selectgetUserStatus = (state) => state.user.getUser.status;
export const selectUpdateUserStatus = (state) => state.user.updateUser.status;
export const selectUpdateUserError = (state) => state.user.updateUser.error;

export default userSlice.reducer;
