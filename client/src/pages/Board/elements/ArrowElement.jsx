import { Arrow } from "react-konva";
import useElementInteractions from "../../hooks/useElementInteractions";

const ArrowElement = ({ element }) => {
  const interactions = useElementInteractions(element);
  return (
    <Arrow
      points={element.element_data.points}
      stroke={element.element_data.stroke}
      strokeWidth={element.element_data.strokeWidth}
    />
  )
}
export default ArrowElement;
