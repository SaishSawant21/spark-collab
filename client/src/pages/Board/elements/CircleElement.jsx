import { forwardRef } from "react";
import { Circle } from "react-konva";
import useElementInteractions from "../../hooks/useElementInteractions";

const CircleElement = forwardRef(({ element }, ref) => {
  const elementData = element.element_data;
  const interactions = useElementInteractions(element);
  return (
    <Circle
      ref={ref}
      x={elementData.x}
      y={elementData.y}
      radius={elementData.radius}
      fill={elementData.fill}
      stroke={elementData.stroke}
      strokeWidth={elementData.strokeWidth}
      draggable={interactions.draggable}
    />
  )
})

export default CircleElement