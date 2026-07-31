import { TOOLS } from "./constants";

const applyDrag = (element, node) => {
  switch (element.element_type) {
    case TOOLS.RECTANGLE:
    case TOOLS.CIRCLE:
    case TOOLS.ELLIPSE:
      return {
        ...element,
        element_data: {
          ...element.element_data,
          x: node.x(),
          y: node.y(),
        },
      };

    default:
      return element;
  }
};

export default applyDrag;