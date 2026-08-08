import { useCallback, useContext, useEffect } from "react";
import { BoardContext } from "../../context/BoardContext";
import { socket } from "./../../socket";
const useKeyboardShortcuts = () => {
  const { undo, redo,
    selectedElementId, setSelectedElementId,
    updateElements,
    duplicateSelectedElement
  } = useContext(BoardContext);
  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "z" && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if (e.ctrlKey && e.key.toLowerCase() === "y") {
      e.preventDefault();
      redo();
    } else if (e.key === "Delete" && selectedElementId) {
      e.preventDefault();
      const deletedElementId = selectedElementId;

      updateElements((prev) =>
        prev.filter((item) => item.id !== deletedElementId)
      );

      socket.emit("element-deleted", deletedElementId);
      setSelectedElementId(null);
    } else if (e.ctrlKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      duplicateSelectedElement();
    } else if (e.key === "Escape") {
      setSelectedElementId(null);
      socket.emit("element-deselected");
    }
  }, [undo, redo, updateElements, selectedElementId])
  useEffect(() => {

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [handleKeyDown])
}

export default useKeyboardShortcuts