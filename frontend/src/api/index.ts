import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5173/" });

API.interceptors.request.use((req) => {
  try {
    const TOKEN = localStorage.getItem("profile");
    if (TOKEN) {
      req.headers.Authorization = `Bearer ${JSON.parse(TOKEN)}`;
      return req;
    }
    throw new Error("Token is Missing!");
  } catch (error) {
    console.log(error);

    return req;
  }
});

export const signin = async (data: object) => {
  const response = await API.post("/api/user/signin", data);
  return response.data;
};

export const signup = async (data: object) => {
  const response = await API.post("/api/user/signup", data);
  return response.data;
};

export const fetchData = async () => {
  const response = await API.get("/api/home");
  return response.data;
};
