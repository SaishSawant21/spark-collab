import { useCallback, useState } from "react";
import { BoardContext } from "./BoardContext";
import { messageContants, TOOLS } from "../utils/constants";
import offsetElement from "../utils/offsetElement";
import useElementActions from "./actions/elementActions";
import useBoardSocket from "../pages/hooks/useBoardSocket";
import { socket } from "../socket";
import { useParams } from "react-router-dom";
import { fetchBoardElements, replaceBoardElements } from "../services/boardElementService";
import { useEffect } from "react";
import { message } from "antd";
const BoardProvider = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState(TOOLS.SELECT);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const { boardId } = useParams() || null;

  const saveHistory = useCallback(() => {
    setUndoStack((prev) => [
      ...prev,
      structuredClone(elements),
    ]);

    setRedoStack([]);
  }, [elements]);

  const updateElements = useCallback((updater) => {
    setElements((prev) => {
      setUndoStack((history) => [
        ...history,
        structuredClone(prev),
      ]);

      setRedoStack([]);

      return typeof updater === "function"
        ? updater(prev)
        : updater;
    });
  }, []);

  const undo = async () => {
    if (undoStack.length === 0) return;

    const previousState = undoStack[undoStack.length - 1];

    try {
      await replaceBoardElements(boardId, previousState);

      setRedoStack((prev) => [
        ...prev,
        structuredClone(elements),
      ]);

      setElements(previousState);

      socket.emit("elements-replaced", previousState);

      setUndoStack((prev) => prev.slice(0, -1));
    } catch (error) {
      console.log("Undo failed:", error);
      message.error(
        error?.response?.data?.message ||
        messageContants.somethingWerntWrong
      );
    }
  };

  const redo = async () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack[redoStack.length - 1];

    try {
      await replaceBoardElements(boardId, nextState);

      setUndoStack((prev) => [
        ...prev,
        structuredClone(elements),
      ]);

      setElements(nextState);

      socket.emit("elements-replaced", nextState);

      setRedoStack((prev) => prev.slice(0, -1));
    } catch (error) {
      console.log("Redo failed:", error);

      message.error(
        error?.response?.data?.message ||
        messageContants.somethingWerntWrong
      );
    }
  };

  const replaceElements = (updater) => {
    setElements(updater);
  };

  const loadBoardElements = async () => {
    try {
      const res = await fetchBoardElements(boardId);

      if (res?.code === 200) {
        setElements(res?.boardElements || []);
        console.log(boardId)
        console.log(res?.boardElements)
      }
    } catch (error) {
      console.log("Failed to fetch board elements:", error);
      setElements([]);
    }
  };

  useEffect(() => {
    if (!boardId) return;
    loadBoardElements();
  }, [boardId])

  useBoardSocket(boardId, updateElements, replaceElements);
  const {
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack,
    duplicateSelectedElement,
  } = useElementActions({
    updateElements,
    elements,
    selectedElementId,
    setSelectedElementId,
  });

  const value = {
    selectedTool,
    setSelectedTool,

    isDrawing,
    setIsDrawing,

    currentElement,
    setCurrentElement,

    elements,
    setElements,

    selectedElementId,
    setSelectedElementId,

    updateElements,
    replaceElements,

    undo,

    redo,

    duplicateSelectedElement,
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  )
}
export default BoardProvider;
