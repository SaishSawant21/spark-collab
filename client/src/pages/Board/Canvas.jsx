import { Stage, Layer } from 'react-konva';
import React, { useState } from 'react'
import Rectangle from './elements/Rectangle';

const Canvas = () => {
  const [elements, setElements] = useState([
    {
      id: 1,
      element_type: "rectangle",
      element_data: {
        x: 100,
        y: 100,
        width: 200,
        height: 100,
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 2
      }
    }
  ]
  );

  const handleStageClick = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    console.log(x, y);
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
        onClick={handleStageClick}>
        <Layer>
          {
            elements.map((element) => (
              <Rectangle key={element.id}
                element={element}
                setElements={setElements}
              />
            ))
          }
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas