import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import { saveBoardElement } from "../../services/boardElementService";
import { socket } from "../../socket";

const useTextEditor = () => {
  const {
    elements,
    updateElements,

    editingTextId,
    setEditingTextId,

    editingText,
    setEditingText,
  } = useContext(BoardContext);

  const startEditing = (element) => {
    console.log("START EDITING:", element);

    setEditingTextId(element.id);

    setEditingText(
      element.element_data.text
    );
  };

  const finishEditing = async () => {
    if (!editingTextId) return;

    const element = elements.find(
      (item) => item.id === editingTextId
    );

    if (!element) {
      setEditingTextId(null);
      setEditingText("");
      return;
    }

    const updatedElement = {
      ...element,
      element_data: {
        ...element.element_data,
        text: editingText,
      },
    };

    updateElements((prev) =>
      prev.map((item) =>
        item.id === editingTextId
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
        "Failed to update text element:",
        error
      );
    }

    setEditingTextId(null);
    setEditingText("");
  };

  return {
    editingTextId,
    editingText,
    setEditingText,
    startEditing,
    finishEditing,
  };
};

export default useTextEditor;