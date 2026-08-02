import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import { TOOLS } from "../../utils/constants";
import applyTransform from "../../utils/applyTransform";
import applyDrag from "../../utils/applyDrag";

const useElementInteractions = (element) => {
  const { selectedTool,
    setSelectedElementId,
    setElements,
    updateElements
  } = useContext(BoardContext);
  const handleSelect = (e) => {
    if (selectedTool !== TOOLS.SELECT) return;
    e.cancelBubble = true;
    setSelectedElementId(element.id);
  }
  const handleDragEnd = (e) => {
    const updatedElement = applyDrag(element, e.target);

    updateElements((prev) =>
      prev.map((item) =>
        item.id === updatedElement.id ? updatedElement : item
      )
    );
  };

  const transformElement = (e) => {
    const updatedElement = applyTransform(element, e.target);

    updateElements((prev) =>
      prev.map((item) =>
        item.id === updatedElement.id ? updatedElement : item
      )
    );
  };

  return {
    draggable: selectedTool === TOOLS.SELECT,
    handleSelect,
    handleDragEnd,
    transformElement
  };
}
export default useElementInteractions;
