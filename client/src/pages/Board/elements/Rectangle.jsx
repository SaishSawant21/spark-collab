import { Rect } from "react-konva";
import { forwardRef, useContext } from 'react'
import { BoardContext } from "../context/BoardContext";
import { TOOLS } from "../../../utils/constants";
import useElementInteractions from "../../hooks/useElementInteractions";

const Rectangle = forwardRef(({ element }, ref) => {
  const { selectedTool,
    setElements,
    selectedElementId, setSelectedElementId } = useContext(BoardContext);
  const interactions = useElementInteractions(element);

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
      draggable={interactions.draggable}
      onMouseDown={interactions.handleSelect}
      onDragEnd={interactions.handleDragEnd}
      onTransformEnd={transformElement}
    />
  )
});

export default Rectangle