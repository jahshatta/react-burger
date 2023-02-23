import { IUser } from "./../../../ts/interfaces/user.interface";
import api from "../api";
import { getCookie } from "../../utils";

export type userParams = {
  email: string;
  name: string;
  password: string;
};

export type LogoutParams = {
  token: string;
};

export type ResetPasswordParams = {
  password: string;
  token: string;
};

export interface UserResponse {
  success: boolean;
  user: IUser;
}

export interface RegisterUserResponse extends UserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export async function getUserRequest(): Promise<UserResponse> {
  const response = await api.get("auth/user");
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as UserResponse;
}

export async function updateUserRequest(
  params: userParams
): Promise<UserResponse> {
  const response = await api.patch("auth/user", { ...params });
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as UserResponse;
}

export async function registerUserRequest(
  params: userParams
): Promise<RegisterUserResponse> {
  const response = await api.post("auth/register", { ...params });
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as RegisterUserResponse;
}

export async function loginUserRequest(
  params: Omit<userParams, "name">
): Promise<RegisterUserResponse> {
  const response = await api.post("auth/login", { ...params });
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as RegisterUserResponse;
}

export async function logoutUserRequest(): Promise<LogoutResponse> {
  const refreshToken: string | undefined = getCookie("refreshToken");
  const response = await api.post("auth/logout", {
    token: refreshToken,
  });
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as LogoutResponse;
}

export async function resetUserPasswordRequest(
  params: Omit<userParams, "name" | "password">
): Promise<LogoutResponse> {
  const response = await api.post("password-reset", { ...params });
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as LogoutResponse;
}

export async function confirmResetUserPasswordRequest(
  params: ResetPasswordParams
): Promise<LogoutResponse> {
  const response = await api.post("password-reset/reset", { ...params });
  const { data } = response;
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as LogoutResponse;
}
