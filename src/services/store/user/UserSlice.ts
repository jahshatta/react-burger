import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "../../utils";
import { IUser } from "../../../ts/interfaces/user.interface";
import {
  getUserRequest,
  updateUserRequest,
  registerUserRequest,
  loginUserRequest,
  logoutUserRequest,
  resetUserPasswordRequest,
  confirmResetUserPasswordRequest,
} from "../../api/user";
import { userParams, ResetPasswordParams } from "../../api/user";
import { RootState } from "../store";
type TState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
};
interface IUserState {
  user: IUser | null;
  token: string | null;
  updateUser: TState;
  register: TState;
  login: TState;
  logout: TState;
  resetPassword: TState;
  confirmResetPassword: TState;
  getUser: TState;
}

export const initialState: IUserState = {
  user: null,
  token: null,
  updateUser: {
    status: "idle",
    error: "",
  },
  register: {
    status: "idle",
    error: "",
  },
  login: {
    status: "idle",
    error: "",
  },
  logout: {
    status: "idle",
    error: "",
  },
  resetPassword: {
    status: "idle",
    error: "",
  },
  confirmResetPassword: {
    status: "idle",
    error: "",
  },
  getUser: {
    status: "idle",
    error: "",
  },
};

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await getUserRequest();
  return response;
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (params: userParams) => {
    const response = await updateUserRequest(params);
    return response;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params: userParams) => {
    const response = await registerUserRequest(params);
    return response;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (params: Omit<userParams, "name">) => {
    const response = await loginUserRequest(params);
    return response;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await logoutUserRequest();
  return response;
});

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (params: Omit<userParams, "name" | "password">) => {
    const response = await resetUserPasswordRequest({
      ...params,
    });
    return response;
  }
);

export const confirmResetPassword = createAsyncThunk(
  "user/confirmResetPassword",
  async (params: ResetPasswordParams) => {
    const response = await confirmResetUserPasswordRequest({ ...params });
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
          action.error.message ||
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
          action.error.message ||
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
          action.error.message ||
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
          action.error.message ||
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
          action.error.message ||
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
          action.error.message ||
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
          action.error.message ||
          "Что-то пошло не так. Повторите попытку позже.";
      });
  },
});

export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectRegisterStatus = (state: RootState) =>
  state.user.register.status;
export const selectRegisterError = (state: RootState) =>
  state.user.register.error;
export const selectLoginStatus = (state: RootState) => state.user.login.status;
export const selectLoginError = (state: RootState) => state.user.login.error;
export const selectLogoutStatus = (state: RootState) =>
  state.user.logout.status;
export const selectLogoutError = (state: RootState) => state.user.logout.error;
export const selectResetPasswordStatus = (state: RootState) =>
  state.user.resetPassword.status;
export const selectResetPasswordError = (state: RootState) =>
  state.user.resetPassword.error;
export const selectConfirmResetPasswordStatus = (state: RootState) =>
  state.user.confirmResetPassword.status;
export const selectConfirmResetPasswordError = (state: RootState) =>
  state.user.confirmResetPassword.error;
export const selectgetUserStatus = (state: RootState) =>
  state.user.getUser.status;
export const selectUpdateUserStatus = (state: RootState) =>
  state.user.updateUser.status;
export const selectUpdateUserError = (state: RootState) =>
  state.user.updateUser.error;

export default userSlice.reducer;
