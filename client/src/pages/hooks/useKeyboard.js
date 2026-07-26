import { useCallback, useContext, useEffect } from 'react'
import { BoardContext } from '../Board/context/BoardContext'

const useKeyboard = () => {
  const { setElements,
    selectedElementId, setSelectedElementId
  } = useContext(BoardContext);

  const handleKeyDown = useCallback((e) => {
    if (e.key !== "Delete") return;

    setElements((prev) =>
      prev.filter((item) => item.id !== selectedElementId)
    );

    setSelectedElementId(null);
  }, [
    selectedElementId,
    setElements,
    setSelectedElementId,
  ]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}

export default useKeyboard