import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import { messageContants, TOOLS } from "../../utils/constants";
import applyTransform from "../../utils/applyTransform";
import applyDrag from "../../utils/applyDrag";
import { socket } from "../../socket";
import { updateBoardElement } from "../../services/boardElementService";
import { message } from "antd";
import { saveBoardElement } from './../../services/boardElementService';
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

    socket.emit("element-selected", {
      elementId: element.id,
    });
  };


  const handleDragEnd = async (e) => {
    const updatedElement = applyDrag(element, e.target);

    updateElements((prev) =>
      prev.map((item) =>
        item.id === updatedElement.id
          ? updatedElement
          : item
      )
    );

    try {
      await saveBoardElement(updatedElement);
      socket.emit("element-updated", updatedElement);
    } catch (error) {
      console.error("Failed to save element:", error);
    }
  };
  const transformElement = async (e) => {
    const updatedElement = applyTransform(element, e.target);

    updateElements((prev) =>
      prev.map((item) =>
        item.id === updatedElement.id ? updatedElement : item
      )
    );

    try {
      await saveBoardElement(updatedElement);
      socket.emit("element-updated", updatedElement);
    } catch (error) {
      console.error("Failed to save element:", error);
    }
  };

  return {
    draggable: selectedTool === TOOLS.SELECT,
    handleSelect,
    handleDragEnd,
    transformElement
  };
}
export default useElementInteractions;
