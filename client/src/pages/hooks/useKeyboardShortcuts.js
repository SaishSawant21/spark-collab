import { useCallback, useContext, useEffect } from "react";
import { BoardContext } from "../../context/BoardContext";
import { socket } from "./../../socket";
import { deleteBoardElement } from "../../services/boardElementService";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { messageContants } from "../../utils/constants";
const useKeyboardShortcuts = () => {
  const { undo, redo,
    selectedElementId, setSelectedElementId,
    updateElements,
    duplicateSelectedElement,
    zoomIn, zoomOut
  } = useContext(BoardContext);
  const { boardId } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = useCallback(async (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "z" && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if (e.ctrlKey && e.key.toLowerCase() === "y") {
      e.preventDefault();
      redo();
    } else if (e.key === "Delete" && selectedElementId) {
      e.preventDefault();
      const deletedElementId = selectedElementId;
      try {
        let payload = {
          element_id: deletedElementId
        }
        await deleteBoardElement(boardId, payload);

        updateElements((prev) =>
          prev.filter((item) => item.id !== deletedElementId)
        );

        socket.emit("element-deleted", deletedElementId);
        setSelectedElementId(null);
      } catch (error) {
        message.error(
          error?.response?.data?.message ||
          messageContants.somethingWerntWrong
        );

        console.log("Error:", error);
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      duplicateSelectedElement();
    } else if (e.key === "Escape") {
      setSelectedElementId(null);
      socket.emit("element-deselected");
    } else if (e.ctrlKey && (e.key === "+" || e.key === "=")) {
      e.preventDefault();
      zoomIn();
    } else if (e.ctrlKey && e.key === "-") {
      e.preventDefault();
      zoomOut();
    }
  }, [undo, redo, updateElements, selectedElementId])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

}

export default useKeyboardShortcuts