import { useEffect } from "react";
import { socket } from "./socket";
import Board from "./pages/Board/Board";
import AppLayout from "./layouts/AppLayout";
import BoardProvider from "./context/BoardProvider";

function App() {
  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log("⬅️", event, args);
    });
    const onConnect = () => {
      console.log("Connected:", socket.id);

      socket.emit("join-board", {
        boardId: 5,
      });
    };

    socket.on("connect", onConnect);

    const onJoinedBoard = (data) => {
      console.log("🔥 Joined Board:", data);
    };

    socket.on("joined-board", onJoinedBoard);
    socket.connect();
  }, []);
  return (
    <BoardProvider>
      <AppLayout>
        <Board />
      </AppLayout>
    </BoardProvider>
  )
}

export default App;