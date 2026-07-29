import { useContext } from 'react'
import { BoardContext } from '../Board/context/BoardContext';
import { TOOLS } from '../../utils/constants';
import elementRegistry from '../Board/elements/elementRegistry';
import drawingRegistry from '../Board/elements/drawingRegistry';

const useDrawing = () => {
  const { selectedTool,
    isDrawing, setIsDrawing,
    currentElement, setCurrentElement,
    setElements,
    updateElements
  } = useContext(BoardContext);

  const handleMouseDown = (e) => {
    if (!selectedTool) return;
    if (e.target !== e.target.getStage()) return;
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    setIsDrawing(true);
    if (selectedTool === TOOLS.RECTANGLE) {
      setCurrentElement(drawingRegistry.rectangle(position));
    } else if (selectedTool === TOOLS.LINE || selectedTool === TOOLS.ARROW) {
      setCurrentElement(drawingRegistry.line(position, selectedTool));
    } else if (selectedTool === TOOLS.CIRCLE) {
      setCurrentElement(drawingRegistry.circle(position));
    } else if (selectedTool === TOOLS.ELLIPSE) {
      setCurrentElement(drawingRegistry.ellipse(position));
    }
  }

  const handleMouseMove = (e) => {
    if (!selectedTool) return;
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    if (selectedTool === TOOLS.RECTANGLE) {
      setCurrentElement((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          element_data: {
            ...prev.element_data,
            width: position.x - prev.element_data.x,
            height: position.y - prev.element_data.y,
          },
        };
      });
    } else if (selectedTool === TOOLS.LINE || selectedTool === TOOLS.ARROW) {
      setCurrentElement((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          element_data: {
            ...prev.element_data,
            points: [
              prev.element_data.points[0],
              prev.element_data.points[1],
              position.x,
              position.y,
            ],
          },
        };
      });
    } else if (selectedTool === TOOLS.CIRCLE) {
      setCurrentElement((prev) => {
        if (!prev) return null;
        const dx = position.x - prev.element_data.x;
        const dy = position.y - prev.element_data.y;
        const radius = Math.hypot(dx, dy);
        return {
          ...prev,
          element_data: {
            ...prev.element_data,
            radius
          },
        };
      });
    } else if (selectedTool === TOOLS.ELLIPSE) {
      setCurrentElement((prev) => {
        if (!prev) return null;
        const dx = position.x - prev.element_data.x;
        const dy = position.y - prev.element_data.y;

        return {
          ...prev,
          element_data: {
            ...prev.element_data,
            radiusX: Math.abs(dx),
            radiusY: Math.abs(dy)
          },
        };
      });
    }

  }

  const handleMouseUp = () => {
    if (!isDrawing) return;
    if (currentElement) {
      const registryItem = elementRegistry[currentElement.element_type];

      if (!registryItem.isValid(currentElement)) {
        setCurrentElement(null);
        setIsDrawing(false);
        return;
      }

      updateElements((prev) => [...prev, currentElement]);
    }
    setCurrentElement(null);
    setIsDrawing(false);
  }
  return { handleMouseDown, handleMouseMove, handleMouseUp };
}

export default useDrawing