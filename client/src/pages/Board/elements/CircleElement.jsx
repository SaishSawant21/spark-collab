import { forwardRef, useContext } from "react";
import { Circle } from "react-konva";
import useElementInteractions from "../../hooks/useElementInteractions";
import { BoardContext } from "../context/BoardContext";

const CircleElement = forwardRef(({ element }, ref) => {
  const elementData = element.element_data;
  const interactions = useElementInteractions(element);
  const { selectedElementId } = useContext(BoardContext);
  return (
    <Circle
      ref={ref}
      x={elementData.x}
      y={elementData.y}
      radius={elementData.radius}
      fill={elementData.fill}
      stroke={selectedElementId === element.id ? '#1677ff' : element.element_data.stroke}
      strokeWidth={selectedElementId === element.id ? 3 : element.element_data.strokeWidth}
      draggable={interactions.draggable}
      onMouseDown={interactions.handleSelect}
      onDragEnd={interactions.handleDragEnd}
      onTransformEnd={interactions.transformElement}
    />
  )
})

export default CircleElement