import { TOOLS } from "./constants";

const applyTransform = (element, node) => {
  switch (element.element_type) {
    case TOOLS.RECTANGLE: {
      const newWidth = Math.max(10, node.width() * node.scaleX());
      const newHeight = Math.max(10, node.height() * node.scaleY());

      node.scaleX(1);
      node.scaleY(1);

      return {
        ...element,
        element_data: {
          ...element.element_data,
          width: newWidth,
          height: newHeight,
          x: node.x(),
          y: node.y(),
        },
      };
    }
    case TOOLS.CIRCLE: {
      const newRadius = Math.max(5, node.radius() * node.scaleX());
      node.scaleX(1);
      node.scaleY(1);

      return {
        ...element,
        element_data: {
          ...element.element_data,
          radius: newRadius,
          x: node.x(),
          y: node.y(),
        },
      };
    }
    case TOOLS.ELLIPSE:
      {
        const newRadiusX = Math.max(5, node.radiusX() * node.scaleX());
        const newRadiusY = Math.max(5, node.radiusY() * node.scaleY());
        node.scaleX(1);
        node.scaleY(1);
        return {
          ...element,
          element_data: {
            ...element.element_data,
            radiusX: newRadiusX,
            radiusY: newRadiusY,
            x: node.x(),
            y: node.y(),
          },
        };
      }
    case TOOLS.LINE:
    case TOOLS.ARROW:
      {
        const oldPoints = node.points();
        const MIN_LINE_LENGTH = 10;
        const newPoints = oldPoints.map((value, index) => {
          if (index % 2 === 0) {
            // x coordinate
            return value * node.scaleX() + node.x();
          }

          // y coordinate
          return value * node.scaleY() + node.y();
        });
        const [x1, y1, x2, y2] = newPoints;
        const length = Math.hypot(x2 - x1, y2 - y1);
        if (length < MIN_LINE_LENGTH) {
          node.scaleX(1);
          node.scaleY(1);
          node.position({ x: 0, y: 0 });

          return element;
        }
        node.scaleX(1);
        node.scaleY(1);
        node.position({ x: 0, y: 0 });
        return {
          ...element,
          element_data: {
            ...element.element_data,
            points: newPoints,
          },
        };
      }
    default:
      return element;
  }
}
export default applyTransform
