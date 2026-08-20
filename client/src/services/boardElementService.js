import { deleteApi, fetchApi, submitApi, updateApi } from './api';
const prefix = '/boards';
export const fetchBoardElements = (boardId) => {
  return fetchApi(`${prefix}/${boardId}/elements`);
}

export const addBoardElement = (boardId, payload) => {
  return submitApi(`${prefix}/${boardId}/elements`, payload);
}

export const updateBoardElement = (elementId, payload) => {
  return updateApi(`${prefix}/${elementId}/elements`, payload);
}

export const saveBoardElement = async (element) => {
  const payload = {
    element_data: element?.element_data,
    element_type: element?.element_type,
  };

  return await updateBoardElement(element?.id, payload);
};

export const deleteBoardElement = async (boardId, payload) => {

  const response = await deleteApi(
    `${prefix}/${boardId}/elements`, payload
  );

  return response.data;
};

export const replaceBoardElements = async (boardId, elements) => {
  const response = await updateApi(
    `${prefix}/${boardId}/replace-elements`,
    { elements }
  );

  return response.data;
};
