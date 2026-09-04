import { Rect } from "react-konva";
import { forwardRef, useContext } from 'react'
import { BoardContext } from "../../../context/BoardContext";
import useElementInteractions from "../../hooks/useElementInteractions";

const Rectangle = forwardRef(({ element }, ref) => {
  const { selectedElementId } = useContext(BoardContext);
  const interactions = useElementInteractions(element);

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
      onTransformEnd={interactions.transformElement}
    />
  )
});

export default Rectangle