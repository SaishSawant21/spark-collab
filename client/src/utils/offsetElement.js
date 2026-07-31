import { TOOLS } from "./constants"

const offsetElement = (element, dx, dy) => {
  switch (element.element_type) {
    case TOOLS.RECTANGLE:
    case TOOLS.CIRCLE:
    case TOOLS.ELLIPSE:
      return {
        ...element,
        element_data: {
          ...element.element_data,
          x: element.element_data.x + dx,
          y: element.element_data.y + dy,
        },
      }
    default:
      return element;
  }
}

export default offsetElement