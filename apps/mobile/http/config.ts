import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:4200/api",
});
