import { fetchApi, submitApi, updateApi } from "./api";
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

export const getProfile = async () => {
  return await fetchApi(`${prefix}/myProfile`);
}

export const updateUserProfile = async (payload) => {
  return await updateApi(`${prefix}/update-profile`, payload);
}