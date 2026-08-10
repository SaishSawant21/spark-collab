import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchApi = async (url, params = {}) => {
  const res = await axios.get(`${API_BASE_URL}${url}`, {
    params,
    withCredentials: true,
  });

  return res?.data;
};

export const submitApi = async (url, payload = {}) => {
  const res = await axios.post(`${API_BASE_URL}${url}`, payload, {
    withCredentials: true,
  });
  return res?.data;
};

export const updateApi = async (url, payload = {}) => {
  const res = await axios.put(`${API_BASE_URL}${url}`, payload, {
    withCredentials: true,
  });
  return res?.data;
};

export const deleteApi = async (url, payload = {}) => {
  const res = await axios.delete(`${API_BASE_URL}${url}`, {
    data: payload,
    withCredentials: true,
  });
  return res?.data;
};