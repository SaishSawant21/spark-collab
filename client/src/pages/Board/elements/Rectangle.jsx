import { Rect } from "react-konva";
import { forwardRef, useContext } from 'react'
import { BoardContext } from "../context/BoardContext";
import { TOOLS } from "../../../utils/constants";

const Rectangle = forwardRef(({ element }, ref) => {
  const { selectedTool,
    setElements,
    selectedElementId, setSelectedElementId } = useContext(BoardContext);

  const handleSelect = (e) => {
    if (selectedTool !== TOOLS.SELECT) return;
    e.cancelBubble = true;
    setSelectedElementId(element.id);
  }

  const transformElement = (e) => {
    const node = e.target;
    const width = node.width();
    const height = node.height();
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newWidth = width * scaleX;
    const newHeight = height * scaleY;
    e.target.scaleX(1);
    e.target.scaleY(1);
    setElements((prev) => {
      return prev.map((item) => {
        if (element.id === item.id) {
          return {
            ...item,
            element_data: {
              ...item.element_data,
              width: newWidth,
              height: newHeight,
              x: node.x(),
              y: node.y(),
            }
          }
        }
        return item;
      })
    })
  }

  return (
    <Rect ref={ref}
      x={element.element_data.x}
      y={element.element_data.y}
      width={element.element_data.width}
      height={element.element_data.height}
      fill={element.element_data.fill}
      stroke={selectedElementId === element.id ? '#1677ff' : element.element_data.stroke}
      strokeWidth={selectedElementId === element.id ? 3 : element.element_data.strokeWidth}
      draggable={selectedTool === TOOLS.SELECT}
      onMouseDown={handleSelect}
      onDragEnd={(e) => setElements((prev) => (
        prev.map((item) => {
          if (item.id === element.id) {
            return {
              ...item,
              element_data: {
                ...item.element_data,
                x: e.target.attrs.x,
                y: e.target.attrs.y
              }
            }
          }
          return item;
        })
      ))}
      onTransformEnd={transformElement}
    />
  )
});

export default Rectangle