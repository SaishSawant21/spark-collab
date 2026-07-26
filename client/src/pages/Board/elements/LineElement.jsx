import { Line } from "react-konva"
const LineElement = ({ element }) => {
  return (
    <Line
      points={element.element_data.points}
      stroke={element.element_data.stroke}
      strokeWidth={element.element_data.strokeWidth}
    />
  )
}

export default LineElement;