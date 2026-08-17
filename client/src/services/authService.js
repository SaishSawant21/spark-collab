import { fetchApi, submitApi } from "./api";
const prefix = '/auth';
export const authenticateUser = (payload) => {
  return submitApi(`${prefix}/login`, payload);
};

export const fetchCurrentUser = () => {
  return fetchApi(`${prefix}/me`);
}

export const logoutUser = () => {
  return fetchApi(`${prefix}/logout`)
}

export const registerUser = async (payload) => {
  return await submitApi(`${prefix}/register`, payload);
};