import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_CARD,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
});

export { instance };
