import React, { useContext, useEffect } from 'react'
import { BoardContext } from '../Board/context/BoardContext'

const useKeyboard = ({ rectangleRefs }) => {
  const { elements, setElements,
    selectedElementId, setSelectedElementId
  } = useContext(BoardContext)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Delete') return;
      const filteredElements = elements.filter((item) => item.id !== selectedElementId);
      setElements(filteredElements);
      delete rectangleRefs.current[selectedElementId];
      setSelectedElementId(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);

    }
  }, [selectedElementId])
}

export default useKeyboard