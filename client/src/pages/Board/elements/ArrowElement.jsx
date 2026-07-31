import { Arrow } from "react-konva";
import useElementInteractions from "../../hooks/useElementInteractions";
import { forwardRef } from "react";

const ArrowElement = forwardRef(({ element }, ref) => {
  const interactions = useElementInteractions(element);
  return (
    <Arrow
      ref={ref}
      points={element.element_data.points}
      stroke={element.element_data.stroke}
      strokeWidth={element.element_data.strokeWidth}
      hitStrokeWidth={20}
      draggable={interactions.draggable}
      onMouseDown={interactions.handleSelect}
      onDragEnd={interactions.handleDragEnd}
      onTransformEnd={interactions.transformElement}
    />
  )
})
export default ArrowElement;
