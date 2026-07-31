import { useCallback, useContext, useEffect } from 'react'
import { BoardContext } from '../Board/context/BoardContext'

const useKeyboard = () => {
  const { setElements,
    selectedElementId, setSelectedElementId
  } = useContext(BoardContext);

  const handleKeyDown = useCallback((e) => {

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