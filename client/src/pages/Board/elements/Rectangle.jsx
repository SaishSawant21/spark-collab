import { Rect } from "react-konva";
import React from 'react'

const Rectangle = ({ element, setElements }) => {
  return (
    <Rect
      x={element.element_data.x}
      y={element.element_data.y}
      width={element.element_data.width}
      height={element.element_data.height}
      fill={element.element_data.fill}
      stroke={element.element_data.stroke}
      strokeWidth={element.element_data.strokeWidth}
      draggable
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