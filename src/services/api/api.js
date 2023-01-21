import axios from "axios";

const BASE_URL = "https://norma.nomoreparties.space/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
