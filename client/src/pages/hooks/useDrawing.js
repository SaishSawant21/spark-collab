import { useContext } from 'react'
import { BoardContext } from '../Board/context/BoardContext';
import { TOOLS } from '../../utils/constants';

const useDrawing = () => {
  const { selectedTool,
    isDrawing, setIsDrawing,
    currentElement, setCurrentElement,
    setElements
  } = useContext(BoardContext);

  const handleMouseDown = (e) => {
    if (selectedTool !== TOOLS.RECTANGLE) return;
    if (e.target !== e.target.getStage()) return;
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    setIsDrawing(true);
    setCurrentElement({
      id: Date.now(),
      element_type: "rectangle",
      element_data: {
        x: position.x,
        y: position.y,
        width: 0,
        height: 0,
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 2,
      },
    });
  }

  const handleMouseMove = (e) => {
    if (selectedTool !== TOOLS.RECTANGLE) return;
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    setCurrentElement((prev) => ({
      ...prev,
      element_data: {
        ...prev.element_data,
        width: position.x - prev.element_data.x,
        height: position.y - prev.element_data.y
      }
    }))

  }

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setElements((prev) => [...prev, currentElement]);
    setCurrentElement(null);
    setIsDrawing(false);
  }
  return { handleMouseDown, handleMouseMove, handleMouseUp };
}

export default useDrawing