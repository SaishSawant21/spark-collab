import { addBoardElementService, deleteBoardElementService, getBoardElementService, replaceBoardElementsService, updateBoardElementService } from "../services/boardElementService.js";
import { deleteBoardService } from "../services/boardService.js";

export const addBoardElement = async (req, res, next) => {
  try {
    const { element_type, element_data } = req.body;
    const elementContent = {
      boardId: parseInt(req.params.boardId),
      createdBy: parseInt(req.user.id),
      elementType: element_type,
      elementData: element_data
    }
    const element = await addBoardElementService(elementContent);
    return res.status(201).json({
      code: 201,
      message: 'Element created successfully',
      element
    })
  } catch (error) {
    next(error);
  }
}

export const getBoardElement = async (req, res, next) => {
  try {
    const elementContent = {
      boardId: parseInt(req.params.boardId),
      userId: parseInt(req.user.id),
    }
    const boardElements = await getBoardElementService(elementContent);
    return res.status(200).json({
      code: 200,
      message: 'Board Elements fetched successfully',
      boardElements
    })
  } catch (error) {
    next(error);
  }
}

export const updateBoardElement = async (req, res, next) => {
  try {
    const { element_type, element_data } = req.body;
    const elementContent = {
      elementId: parseInt(req.params.elementId),
      createdBy: parseInt(req.user.id),
      elementType: element_type,
      elementData: element_data
    }

    await updateBoardElementService(elementContent);
    return res.status(200).json({
      code: 200,
      message: 'Element updated successfully'
    })
  } catch (error) {
    next(error);
  }
}


export const deleteBoardElement = async (req, res, next) => {
  try {
    const elementId = parseInt(req.body.element_id);
    const userId = parseInt(req.user.id);
    const boardId = parseInt(req.params.boardId);
    await deleteBoardElementService(boardId, elementId, userId);
    return res.status(200).json({
      code: 200,
      message: 'Element deleted successfully'
    })
  } catch (error) {
    next(error);
  }
}

export const replaceBoardElements = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { elements } = req.body;

    const result = await replaceBoardElementsService(
      boardId,
      req.user.id,
      elements
    );

    res.status(200).json({
      code: 200,
      message: "Board elements updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};