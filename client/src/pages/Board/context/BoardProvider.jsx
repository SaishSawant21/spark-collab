import { useState } from "react";
import { BoardContext } from "./BoardContext";
import { TOOLS } from "../../../utils/constants";
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
    setSelectedElementId
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  )
}
export default BoardProvider;
