import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchApi = async (url, params = {}) => {
  console.log("Base url: ", API_BASE_URL);
  return axios.get(`${API_BASE_URL}${url}`, {
    params,
    withCredentials: true,
  });
};

export const submitApi = async (url, payload = {}) => {
  return axios.post(`${API_BASE_URL}${url}`, payload, {
    withCredentials: true,
  });
};

export const updateApi = async (url, payload = {}) => {
  return axios.put(`${API_BASE_URL}${url}`, payload, {
    withCredentials: true,
  });
};

export const deleteApi = async (url, payload = {}) => {
  return axios.delete(`${API_BASE_URL}${url}`, {
    data: payload,
    withCredentials: true,
  });
};