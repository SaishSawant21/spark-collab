import { useContext } from "react";
import { BoardContext } from "../BoardContext";
import offsetElement from "../../utils/offsetElement";

const useElementActions = ({
  updateElements,
  elements,
  selectedElementId,
  setSelectedElementId,
}) => {
  const bringForward = (id) => {
    updateElements((prev) => {
      const index = prev.findIndex((element) => element.id === id);

      if (index === -1 || index === prev.length - 1) {
        return prev;
      }

      const next = [...prev];

      [next[index], next[index + 1]] = [
        next[index + 1],
        next[index],
      ];

      return next;
    });
  };

  const sendBackward = (id) => {
    updateElements((prev) => {
      const index = prev.findIndex((element) => element.id === id);

      if (index <= 0) {
        return prev;
      }

      const next = [...prev];

      [next[index], next[index - 1]] = [
        next[index - 1],
        next[index],
      ];

      return next;
    });
  };
  const bringToFront = (id) => {
    updateElements((prev) => {
      const index = prev.findIndex((element) => element.id === id);

      if (index === -1 || index === prev.length - 1) {
        return prev;
      }

      const next = [...prev];
      const [element] = next.splice(index, 1);

      next.push(element);

      return next;
    });
  };

  const sendToBack = (id) => {
    updateElements((prev) => {
      const index = prev.findIndex((element) => element.id === id);

      if (index <= 0) {
        return prev;
      }

      const next = [...prev];
      const [element] = next.splice(index, 1);

      next.unshift(element);

      return next;
    });
  };
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
  return { bringForward, sendBackward, bringToFront, sendToBack, duplicateSelectedElement };
}

export default useElementActions;