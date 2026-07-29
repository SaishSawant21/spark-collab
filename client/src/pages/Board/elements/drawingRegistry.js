const DEFAULT_STYLES = {
  fill: "#fff",
  stroke: "#000",
  strokeWidth: 2,
};

const drawingRegistry = {
  rectangle: (position) => ({
    id: Date.now(),
    element_type: "rectangle",
    element_data: {
      x: position.x,
      y: position.y,
      width: 0,
      height: 0,
      ...DEFAULT_STYLES
    },
  }),
  circle: (position) => ({
    id: Date.now(),
    element_type: "circle",
    element_data: {
      x: position.x,
      y: position.y,
      radius: 0,
      ...DEFAULT_STYLES
    },
  }),
  line: (position, elementType = "line") => ({
    id: Date.now(),
    element_type: elementType,
    element_data: {
      points: [
        position.x,
        position.y,
        position.x,
        position.y,
      ],
      stroke: DEFAULT_STYLES.stroke,
      strokeWidth: DEFAULT_STYLES.strokeWidth,
    },
  }),
  ellipse: (position) => ({
    id: Date.now(),
    element_type: "ellipse",
    element_data: {
      x: position.x,
      y: position.y,
      radiusX: 0,
      radiusY: 0,
      ...DEFAULT_STYLES,
    },
  }),
};
export default drawingRegistry;