import { createBoardModel } from "../models/boardModel.js";

export const createBoardService = async(title, description, is_public, ownerId) =>{
    const trimTitle = title.trim() || '';
    if(!trimTitle) throw new Error('Title is compulsory');
    if(trimTitle.length > 100) throw new Error('Title is too long');
    const trimDescription = description.trim() || '';
    const boardVisiblity = is_public ?? false;
    return await createBoardModel(trimTitle, trimDescription, boardVisiblity, ownerId);
}