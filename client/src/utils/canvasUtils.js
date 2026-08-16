import { TOOLS } from "./constants";

export const getCanvasPosition = (stage) => {
  const pointer = stage.getPointerPosition();

  return {
    x: (pointer.x - stage.x()) / stage.scaleX(),
    y: (pointer.y - stage.y()) / stage.scaleY(),
  };
};

export const getCanvasCursor = (selectedTool) => {
  switch (selectedTool) {
    case TOOLS.SELECT:
      return "grab";

    case TOOLS.RECTANGLE:
    case TOOLS.CIRCLE:
    case TOOLS.ELLIPSE:
    case TOOLS.LINE:
    case TOOLS.ARROW:
      return "crosshair";

    default:
      return "default";
  }
};

export const setCanvasCursor = (stage, cursor) => {
  stage.container().style.cursor = cursor;
};

export const getZoomedStagePosition = (
  stage,
  newScale
) => {
  const pointer = stage.getPointerPosition();

  const oldScale = stage.scaleX();

  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  return {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };
};