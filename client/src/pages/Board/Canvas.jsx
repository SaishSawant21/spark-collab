import { Stage, Layer } from 'react-konva';
import React, { useContext, useEffect, useState } from 'react'
import Rectangle from './elements/Rectangle';
import { BoardContext } from './context/BoardContext';
import { TOOLS } from '../../utils/constants';

const Canvas = () => {
  const { selectedTool,
    isDrawing, setIsDrawing,
    currentElement, setCurrentElement,
    elements, setElements } = useContext(BoardContext);

  // const { selectedElementId } = useContext(BoardContext);

  // useEffect(() => {
  //   console.log("Canvas:", selectedElementId);
  // }, [selectedElementId]);
  const handleMouseDown = (e) => {
    if (selectedTool !== TOOLS.RECTANGLE) return;
    if (e.target !== e.target.getStage()) return;
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    setIsDrawing(true);
    setCurrentElement({
      id: Date.now(),
      element_type: "rectangle",
      element_data: {
        x: position.x,
        y: position.y,
        width: 0,
        height: 0,
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 2,
      },
    });
  }

  const handleMouseMove = (e) => {
    if (selectedTool !== TOOLS.RECTANGLE) return;
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    setCurrentElement((prev) => ({
      ...prev,
      element_data: {
        ...prev.element_data,
        width: position.x - prev.element_data.x,
        height: position.y - prev.element_data.y
      }
    }))

  }
  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    setElements((prev) => [...prev, currentElement]);
    setCurrentElement(null);
    setIsDrawing(false);
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        <Layer>
          {
            elements.map((element) => (
              <Rectangle key={element.id}
                element={element}
              />
            ))
          }
          {
            currentElement &&
            <Rectangle element={currentElement} />
          }
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas