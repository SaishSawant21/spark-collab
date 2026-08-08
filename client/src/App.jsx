import { useEffect } from "react";
import { socket } from "./socket";
import Board from "./pages/Board/Board";
import AppLayout from "./layouts/AppLayout";
import BoardProvider from "./context/BoardProvider";

function App() {

  return (
    <BoardProvider>
      <AppLayout>
        <Board />
      </AppLayout>
    </BoardProvider>
  )
}

export default App;