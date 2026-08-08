import { useContext, useEffect } from "react";
import { socket } from "../../socket";
import { BoardContext } from "../../context/BoardContext";

const useBoardSocket = (boardId, updateElements) => {

  useEffect(() => {
    if (!boardId) return;

    const onConnect = () => {
      console.log("Connected:", socket.id);

      socket.emit("join-board", {
        boardId,
      });

      // socket.emit("element-created", {
      //   id: Date.now(),
      //   element_type: "rectangle",
      //   element_data: {
      //     x: 300,
      //     y: 200,
      //     width: 150,
      //     height: 80,
      //     fill: "#fff",
      //     stroke: "#000",
      //     strokeWidth: 2,
      //   },
      // });
    };

    const onJoinedBoard = (data) => {
      console.log("🔥 Joined Board:", data);
    };
    // socket.emit("element-created", {
    const onElementCreated = (element) => {
      updateElements((prev) => [...prev, element]);
    };
    socket.on("element-created", onElementCreated);

    socket.on("connect", onConnect);
    socket.on("joined-board", onJoinedBoard);

    if (!socket.connected) {
      socket.connect();
    } else {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("joined-board", onJoinedBoard);
      socket.off("element-created", onElementCreated);
    };
  }, [boardId, updateElements]);
};

export default useBoardSocket;