import axios from "axios";

export const api = axios.create({
  // withCredentials: true,
  baseURL: "https://kai-api.onrender.com/api/v1/",
});

const errorHandler = (error: { response: { status: any } }) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(undefined, (error: { response: { status: any; }; }) => {
  return errorHandler(error);
});
