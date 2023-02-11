import api from "../api";

export async function registerUser(user) {
  const response = await api.post("auth/register", { ...user });
  const { data } = response;
}
