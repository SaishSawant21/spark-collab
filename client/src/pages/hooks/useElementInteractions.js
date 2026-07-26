import { useContext } from "react";
import { BoardContext } from "../Board/context/BoardContext";
import { TOOLS } from "../../utils/constants";

const useElementInteractions = (element) => {
  const { selectedTool,
    setSelectedElementId,
    setElements
  } = useContext(BoardContext);
  const handleSelect = (e) => {
    if (selectedTool !== TOOLS.SELECT) return;
    e.cancelBubble = true;
    setSelectedElementId(element.id);
  }
  const handleDragEnd = (e) => {
    const { x, y } = e.target.position();
    setElements((prev) => (
      prev.map((item) => {
        if (item.id === element.id) {
          return {
            ...item,
            element_data: {
              ...item.element_data,
              x: x,
              y: y
            }
          }
        }
        return item;
      })
    ))
  }
  return {
    draggable: selectedTool === TOOLS.SELECT,
    handleSelect,
    handleDragEnd
  };
}
export default useElementInteractions;
