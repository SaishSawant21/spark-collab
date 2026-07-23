import Canvas from './Canvas'
import BoardProvider from './context/BoardContext'
import ToolBar from './toolbar/ToolBar'

const Board = () => {
  return (
    <BoardProvider>
      <ToolBar />
      <Canvas />
    </BoardProvider>
  )
}

export default Board