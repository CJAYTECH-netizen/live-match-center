import axios from "axios";

export const api = axios.create({
  baseURL: "https://profootball.srv883830.hstgr.cloud",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});