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

export const exportCanvas = (stage, elements) => {
  if (!stage || !elements?.length) return;

  const padding = 40;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  elements.forEach((element) => {
    const data = element.element_data;

    if (!data) return;

    switch (element.element_type) {
      case "rectangle": {
        minX = Math.min(minX, data.x);
        minY = Math.min(minY, data.y);

        maxX = Math.max(
          maxX,
          data.x + data.width
        );

        maxY = Math.max(
          maxY,
          data.y + data.height
        );

        break;
      }

      case "circle": {
        minX = Math.min(
          minX,
          data.x - data.radius
        );

        minY = Math.min(
          minY,
          data.y - data.radius
        );

        maxX = Math.max(
          maxX,
          data.x + data.radius
        );

        maxY = Math.max(
          maxY,
          data.y + data.radius
        );

        break;
      }

      case "ellipse": {
        minX = Math.min(
          minX,
          data.x - data.radiusX
        );

        minY = Math.min(
          minY,
          data.y - data.radiusY
        );

        maxX = Math.max(
          maxX,
          data.x + data.radiusX
        );

        maxY = Math.max(
          maxY,
          data.y + data.radiusY
        );

        break;
      }

      case "line":
      case "arrow": {
        const points = data.points || [];

        for (let i = 0; i < points.length; i += 2) {
          const x = points[i];
          const y = points[i + 1];

          minX = Math.min(minX, x);
          minY = Math.min(minY, y);

          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }

        break;
      }

      default:
        break;
    }
  });

  // No valid drawable elements found
  if (
    minX === Infinity ||
    minY === Infinity ||
    maxX === -Infinity ||
    maxY === -Infinity
  ) {
    return;
  }

  // Add padding around the drawing
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;

  const width = maxX - minX;
  const height = maxY - minY;

  // Save current viewport
  const oldX = stage.x();
  const oldY = stage.y();
  const oldScaleX = stage.scaleX();
  const oldScaleY = stage.scaleY();

  try {
    // Reset stage transformation temporarily
    stage.position({
      x: -minX,
      y: -minY,
    });

    stage.scale({
      x: 1,
      y: 1,
    });

    // Hide Transformer while exporting
    const transformers = stage.find("Transformer");

    transformers.forEach((transformer) => {
      transformer.visible(false);
    });

    stage.batchDraw();

    const dataURL = stage.toDataURL({
      x: 0,
      y: 0,
      width,
      height,
      pixelRatio: 2,
    });

    // Restore Transformer
    transformers.forEach((transformer) => {
      transformer.visible(true);
    });

    // Restore viewport
    stage.position({
      x: oldX,
      y: oldY,
    });

    stage.scale({
      x: oldScaleX,
      y: oldScaleY,
    });

    stage.batchDraw();

    // Download
    const link = document.createElement("a");

    link.download = "spark-collab-board.png";
    link.href = dataURL;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to export canvas:", error);

    // Always restore viewport if export fails
    stage.position({
      x: oldX,
      y: oldY,
    });

    stage.scale({
      x: oldScaleX,
      y: oldScaleY,
    });

    stage.batchDraw();
  }
};