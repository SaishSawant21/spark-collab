import Canvas from './Canvas'
import BoardProvider from './context/BoardProvider'
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