import { deleteApi, fetchApi, submitApi, updateApi } from "./api";
const prefix = "/boards";

export const fetchBoards = () => {
	return fetchApi(`${prefix}`);
};

export const createBoard = async (payload) => {
	const response = await submitApi(`${prefix}`, payload);
	return response;
};

export const deleteBoard = async (boardId) => {
	return await deleteApi(`${prefix}/${boardId}`);
};

export const updateBoard = async (boardId, payload) => {
	return await updateApi(`${prefix}/${boardId}`, payload);
};