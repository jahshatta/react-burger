import userReducer, { initialState } from "./UserSlice";
import {
  register,
  login,
  logout,
  resetPassword,
  confirmResetPassword,
  getUser,
  updateUser,
} from "./UserSlice";

describe("user reducer", () => {
  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle register.pending", () => {
    expect(
      userReducer(initialState, {
        type: register.pending,
      })
    ).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        status: "loading",
      },
    });
  });

  it("should handle register.fulfilled", () => {
    const payload = {
      success: true,
      user: {
        name: "Test User",
        email: "test.user@example.com",
      },
      accessToken: "dummy-access-token",
      refreshToken: "dummy-refresh-token",
    };
    expect(
      userReducer(initialState, {
        type: register.fulfilled,
        payload,
      })
    ).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        status: "succeeded",
      },
      user: payload.user,
    });
  });

  it("should handle register.rejected", () => {
    const error = new Error("Something went wrong.");
    expect(
      userReducer(initialState, {
        type: register.rejected,
        error,
      })
    ).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        status: "failed",
        error: error.message,
      },
    });
  });

  it("should handle login.pending", () => {
    expect(
      userReducer(initialState, {
        type: login.pending,
      })
    ).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        status: "loading",
      },
    });
  });

  it("should handle login.fulfilled", () => {
    const payload = {
      success: true,
      user: {
        name: "Test User",
        email: "test.user@example.com",
      },
      accessToken: "dummy-access-token",
      refreshToken: "dummy-refresh-token",
    };
    expect(
      userReducer(initialState, {
        type: login.fulfilled,
        payload,
      })
    ).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        status: "succeeded",
      },
      user: payload.user,
    });
  });

  it("should handle login.rejected", () => {
    const error = new Error("Something went wrong.");
    expect(
      userReducer(initialState, {
        type: login.rejected,
        error,
      })
    ).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        status: "failed",
        error: error.message,
      },
    });
  });

  it("should handle logout.pending", () => {
    expect(
      userReducer(initialState, {
        type: logout.pending,
      })
    ).toEqual({
      ...initialState,
      logout: {
        ...initialState.logout,
        status: "loading",
      },
    });
  });

  it("should handle logout.fulfilled", () => {
    expect(
      userReducer(initialState, {
        type: logout.fulfilled,
      })
    ).toEqual({
      ...initialState,
      logout: {
        ...initialState.logout,
        status: "succeeded",
      },
      user: null,
    });
  });

  it("should handle logout.rejected", () => {
    const error = new Error("Что-то пошло не так. Повторите попытку позже.");
    expect(
      userReducer(initialState, {
        type: logout.rejected,
        error,
      })
    ).toEqual({
      ...initialState,
      logout: {
        ...initialState.logout,
        status: "failed",
        error: error.message,
      },
    });
  });

  it("should handle resetPassword.pending", () => {
    expect(
      userReducer(initialState, {
        type: resetPassword.pending,
      })
    ).toEqual({
      ...initialState,
      resetPassword: {
        ...initialState.resetPassword,
        status: "loading",
      },
    });
  });

  it("should handle resetPassword.fulfilled", () => {
    expect(
      userReducer(initialState, {
        type: resetPassword.fulfilled,
      })
    ).toEqual({
      ...initialState,
      resetPassword: {
        ...initialState.resetPassword,
        status: "succeeded",
      },
    });
  });

  it("should handle resetPassword.rejected", () => {
    const error = new Error("Что-то пошло не так. Повторите попытку позже.");
    expect(
      userReducer(initialState, {
        type: resetPassword.rejected,
        error,
      })
    ).toEqual({
      ...initialState,
      resetPassword: {
        ...initialState.resetPassword,
        status: "failed",
        error: error.message,
      },
    });
  });

  it("should handle confirmResetPassword.pending", () => {
    expect(
      userReducer(initialState, {
        type: confirmResetPassword.pending,
      })
    ).toEqual({
      ...initialState,
      confirmResetPassword: {
        ...initialState.confirmResetPassword,
        status: "loading",
      },
    });
  });

  it("should handle confirmResetPassword.fulfilled", () => {
    expect(
      userReducer(initialState, {
        type: confirmResetPassword.fulfilled,
      })
    ).toEqual({
      ...initialState,
      confirmResetPassword: {
        ...initialState.confirmResetPassword,
        status: "succeeded",
      },
    });
  });

  it("should handle confirmResetPassword.rejected", () => {
    const error = new Error("Что-то пошло не так. Повторите попытку позже.");
    expect(
      userReducer(initialState, {
        type: confirmResetPassword.rejected,
        error,
      })
    ).toEqual({
      ...initialState,
      confirmResetPassword: {
        ...initialState.confirmResetPassword,
        status: "failed",
        error: error.message,
      },
    });
  });

  it("should handle getUser.pending", () => {
    expect(
      userReducer(initialState, {
        type: getUser.pending,
      })
    ).toEqual({
      ...initialState,
      getUser: {
        ...initialState.getUser,
        status: "loading",
      },
    });
  });

  it("should handle getUser.fulfilled", () => {
    const payload = {
      success: true,
      user: {
        name: "Test User",
        email: "test.user@example.com",
      },
    };
    expect(
      userReducer(initialState, {
        type: getUser.fulfilled,
        payload,
      })
    ).toEqual({
      ...initialState,
      getUser: {
        ...initialState.getUser,
        status: "succeeded",
      },
      user: payload.user,
    });
  });

  it("should handle getUser.rejected", () => {
    const error = new Error("Something went wrong.");
    expect(
      userReducer(initialState, {
        type: getUser.rejected,
        error,
      })
    ).toEqual({
      ...initialState,
      getUser: {
        ...initialState.getUser,
        status: "failed",
        error: error.message,
      },
    });
  });

  it("should handle updateUser.pending", () => {
    expect(
      userReducer(initialState, {
        type: updateUser.pending,
      })
    ).toEqual({
      ...initialState,
      updateUser: {
        ...initialState.updateUser,
        status: "loading",
      },
    });
  });

  it("should handle updateUser.fulfilled", () => {
    const payload = {
      success: true,
      user: {
        name: "Test User",
        email: "test.user@example.com",
      },
    };
    expect(
      userReducer(initialState, {
        type: updateUser.fulfilled,
        payload,
      })
    ).toEqual({
      ...initialState,
      updateUser: {
        ...initialState.updateUser,
        status: "succeeded",
      },
      user: payload.user,
    });
  });

  it("should handle updateUser.rejected", () => {
    const error = new Error("Something went wrong.");
    expect(
      userReducer(initialState, {
        type: updateUser.rejected,
        error,
      })
    ).toEqual({
      ...initialState,
      updateUser: {
        ...initialState.updateUser,
        status: "failed",
        error: error.message,
      },
    });
  });
});
