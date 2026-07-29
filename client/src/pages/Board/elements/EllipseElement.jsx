import { Ellipse } from "react-konva"
import useElementInteractions from "../../hooks/useElementInteractions";
import { forwardRef } from "react";
const EllipseElement = forwardRef(({ element }, ref) => {
	const elementData = element.element_data;
	const interactions = useElementInteractions(element);
	return (
		<Ellipse
			ref={ref}
			x={elementData.x}
			y={elementData.y}
			radiusX={elementData.radiusX}
			radiusY={elementData.radiusY}
			fill={elementData.fill}
			stroke={elementData.stroke}
			strokeWidth={elementData.strokeWidth}
			draggable={interactions.draggable}
		/>
	)
})

export default EllipseElement