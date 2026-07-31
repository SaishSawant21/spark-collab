import { useState } from "react";
import { BoardContext } from "./BoardContext";
import { TOOLS } from "../../../utils/constants";
import offsetElement from "../../../utils/offsetElement";
const BoardProvider = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState(TOOLS.SELECT);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [elements, setElements] = useState([
    {
      id: 1,
      element_type: "rectangle",
      element_data: {
        x: 100,
        y: 100,
        width: 200,
        height: 100,
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 2
      }
    }
  ]
  );
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const saveHistory = () => {
    setUndoStack((prev) => [
      ...prev, structuredClone(elements)
    ]);
    setRedoStack([]);
  }

  const updateElements = (updater) => {
    saveHistory();
    setElements(updater);
  }

  const undo = () => {
    if (undoStack.length === 0) return;
    setRedoStack((prev) => [
      ...prev,
      structuredClone(elements)
    ]);
    const previousState = undoStack[undoStack.length - 1];
    setElements(previousState);
    setUndoStack((prev) => prev.slice(0, -1));
  }

  const redo = () => {
    if (redoStack.length === 0) return;
    setUndoStack((prev) => [
      ...prev, structuredClone(elements)
    ])
    const nextState = redoStack[redoStack.length - 1];
    setElements(nextState);
    setRedoStack((prev) => prev.slice(0, -1));
  }

  const duplicateSelectedElement = () => {
    if (!selectedElementId) return;
    const selectedElement = elements.find((item) => item.id === selectedElementId);
    if (!selectedElement) return;
    const clone = structuredClone(selectedElement);
    clone.id = Date.now();
    const duplicatedElement = offsetElement(clone, 20, 20);
    updateElements((prev) => [...prev, duplicatedElement]);
    setSelectedElementId(duplicatedElement.id);
  }

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

    undo,

    redo,

    duplicateSelectedElement,
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  )
}
export default BoardProvider;
