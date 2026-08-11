import { useCallback, useState } from "react";
import { BoardContext } from "./BoardContext";
import { TOOLS } from "../utils/constants";
import offsetElement from "../utils/offsetElement";
import useElementActions from "./actions/elementActions";
import useBoardSocket from "../pages/hooks/useBoardSocket";
import { socket } from "../socket";
import { useParams } from "react-router-dom";
const BoardProvider = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState(TOOLS.SELECT);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const { boardId } = useParams();

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

  const undo = () => {
    if (undoStack.length === 0) return;

    setRedoStack((prev) => [
      ...prev,
      structuredClone(elements),
    ]);

    const previousState = undoStack[undoStack.length - 1];

    setElements(previousState);

    socket.emit("elements-replaced", previousState);

    setUndoStack((prev) => prev.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    setUndoStack((prev) => [
      ...prev,
      structuredClone(elements),
    ]);

    const nextState = redoStack[redoStack.length - 1];

    setElements(nextState);

    socket.emit("elements-replaced", nextState);

    setRedoStack((prev) => prev.slice(0, -1));
  };

  const replaceElements = (updater) => {
    setElements(updater);
  };

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
