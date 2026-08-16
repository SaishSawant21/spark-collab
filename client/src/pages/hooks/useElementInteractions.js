import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import { TOOLS } from "../../utils/constants";
import applyTransform from "../../utils/applyTransform";
import applyDrag from "../../utils/applyDrag";
import { socket } from "../../socket";
import { saveBoardElement } from "../../services/boardElementService";
import { getCanvasCursor, setCanvasCursor } from "../../utils/canvasUtils";

const useElementInteractions = (element) => {
  const {
    selectedTool,
    setSelectedElementId,
    updateElements,
  } = useContext(BoardContext);

  const handleSelect = (e) => {
    if (selectedTool !== TOOLS.SELECT) return;

    e.cancelBubble = true;

    const stage = e.target.getStage();

    setCanvasCursor(stage, getCanvasCursor(selectedTool));
    setSelectedElementId(element.id);

    socket.emit("element-selected", {
      elementId: element.id,
    });
  };

  const handleDragEnd = async (e) => {
    const stage = e.target.getStage();

    // Restore select cursor after dragging
    setCanvasCursor(stage, "grab");

    const updatedElement = applyDrag(
      element,
      e.target
    );

    updateElements((prev) =>
      prev.map((item) =>
        item.id === updatedElement.id
          ? updatedElement
          : item
      )
    );

    try {
      await saveBoardElement(updatedElement);

      socket.emit(
        "element-updated",
        updatedElement
      );
    } catch (error) {
      console.error(
        "Failed to save element:",
        error
      );
    }
  };

  const transformElement = async (e) => {
    const stage = e.target.getStage();

    // Restore cursor after transformation
    setCanvasCursor(stage, getCanvasCursor(selectedTool));
    const updatedElement = applyTransform(
      element,
      e.target
    );

    updateElements((prev) =>
      prev.map((item) =>
        item.id === updatedElement.id
          ? updatedElement
          : item
      )
    );

    try {
      await saveBoardElement(updatedElement);

      socket.emit(
        "element-updated",
        updatedElement
      );
    } catch (error) {
      console.error(
        "Failed to save element:",
        error
      );
    }
  };

  return {
    draggable:
      selectedTool === TOOLS.SELECT,

    handleSelect,
    handleDragEnd,
    transformElement,
  };
};

export default useElementInteractions;