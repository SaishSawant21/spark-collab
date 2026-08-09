import { useContext, useEffect } from "react";
import { socket } from "../../socket";
import { BoardContext } from "../../context/BoardContext";
import { useState } from "react";

const useBoardSocket = (boardId, updateElements, replaceElements) => {
  const [remoteSelections, setRemoteSelections] = useState({});
  useEffect(() => {
    if (!boardId) return;

    const onConnect = () => {
      console.log("Connected:", socket.id);

      socket.emit("join-board", {
        boardId,
      });

    };

    const onJoinedBoard = (data) => {
      console.log("Joined Board:", data);
    };

    const onElementCreated = (element) => {
      replaceElements((prev) => [...prev, element]);
    };

    const onElementUpdated = (updatedElement) => {
      replaceElements((prev) =>
        prev.map((element) =>
          element.id === updatedElement.id
            ? updatedElement
            : element
        )
      );
    };

    const onElementDeleted = (elementId) => {
      replaceElements((prev) =>
        prev.filter((element) => element.id !== elementId)
      );
    };

    const onElementsReplaced = (elements) => {
      replaceElements(elements);
    };

    const onElementSelected = ({ socketId, elementId }) => {
      setRemoteSelections((prev) => ({
        ...prev,
        [socketId]: elementId,
      }));
      console.log("Remote selection:", {
        socketId,
        elementId,
      });
    };

    const onElementDeselected = ({ socketId }) => {
      setRemoteSelections((prev) => {
        const next = { ...prev };
        delete next[socketId];
        return next;
      });
    };

    const onUserDisconnected = ({ socketId }) => {
      setRemoteSelections((prev) => {
        const next = { ...prev };
        delete next[socketId];
        return next;
      });
    };

    socket.on("element-created", onElementCreated);
    socket.on("connect", onConnect);
    socket.on("joined-board", onJoinedBoard);
    socket.on("element-updated", onElementUpdated);
    socket.on("element-deleted", onElementDeleted);
    socket.on("elements-replaced", onElementsReplaced);
    socket.on("element-selected", onElementSelected);
    socket.on("element-deselected", onElementDeselected);
    socket.on("user-disconnected", onUserDisconnected);
    if (!socket.connected) {
      socket.connect();
    } else {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("joined-board", onJoinedBoard);
      socket.off("element-created", onElementCreated);
      socket.off("element-updated", onElementUpdated);
      socket.off("element-deleted", onElementDeleted);
      socket.off("elements-replaced", onElementsReplaced);
      socket.off("element-selected", onElementSelected);
      socket.off("element-deselected", onElementDeselected);
      socket.off("user-disconnected", onUserDisconnected);
    };
  }, [boardId, updateElements]);
};

export default useBoardSocket;