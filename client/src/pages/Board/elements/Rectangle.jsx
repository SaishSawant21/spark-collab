import { Rect } from "react-konva";
import React, { useContext, useEffect } from 'react'
import { BoardContext } from "../context/BoardContext";
import { TOOLS } from "../../../utils/constants";

const Rectangle = ({ element }) => {
  const { selectedTool,
    setElements,
    selectedElementId, setSelectedElementId } = useContext(BoardContext);

  const handleClick = (e) => {
    if (selectedTool !== TOOLS.SELECT) return;
    e.cancelBubble = true;
    setSelectedElementId(element.id);
  }

  useEffect(() => {
    console.log(selectedElementId)
  }, [selectedElementId])
  return (
    <Rect
      x={element.element_data.x}
      y={element.element_data.y}
      width={element.element_data.width}
      height={element.element_data.height}
      fill={element.element_data.fill}
      stroke={element.element_data.stroke}
      strokeWidth={element.element_data.strokeWidth}
      draggable={selectedTool === TOOLS.SELECT}
      onClick={handleClick}
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
    />
  )
}

export default Rectangle