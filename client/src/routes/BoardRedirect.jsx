import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BoardsContext } from "../context/BoardsContext";

const BoardRedirect = () => {
  const { boards, loading } = useContext(BoardsContext);

  if (loading) {
    return null;
  }

  if (!boards.length) {
    return <div>No boards available.</div>;
  }

  return <Navigate to={`/board/${boards[0].id}`} replace />;
};

export default BoardRedirect;