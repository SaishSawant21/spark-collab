import { fetchApi } from "./api";
const prefix = "/boards";

export const fetchBoards = () => {
	return fetchApi(`${prefix}`);
};