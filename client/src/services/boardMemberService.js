import { fetchApi, submitApi } from "./api"
const prefix = "/boards";

export const fetchBoardMembers = async (boardId) => {
  return await fetchApi(`${prefix}/${boardId}/members`);
}

export const addBoardMember = async (payload, boardId) => {
  return await submitApi(`${prefix}/${boardId}/members`, payload);
}