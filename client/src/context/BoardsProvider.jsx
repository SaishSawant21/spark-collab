import { useContext, useEffect, useState } from "react";

import { BoardsContext } from "./BoardsContext";
import { AuthContext } from "./AuthContext";

import { fetchBoards } from "../services/boardService";

import { message } from "antd";

import { messageContants } from "../utils/constants";

const BoardsProvider = ({ children }) => {
  const { user, loading: authLoading } =
    useContext(AuthContext);

  const [boards, setBoards] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadBoards = async () => {
    try {
      setLoading(true);

      const res = await fetchBoards();

      if (res?.code === 200) {
        setBoards(res?.boards || []);
      }
    } catch (error) {
      console.log(
        "Failed to fetch boards:",
        error
      );

      setBoards([]);

      message.error(
        messageContants.somethingWerntWrong
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Wait until authentication check is complete
    if (authLoading) return;

    // User is not logged in, so don't fetch boards
    if (!user) {
      setBoards([]);
      return;
    }

    // User is authenticated
    loadBoards();
  }, [user, authLoading]);

  const values = {
    boards,
    setBoards,
    loading,
    loadBoards,
  };

  return (
    <BoardsContext.Provider value={values}>
      {children}
    </BoardsContext.Provider>
  );
};

export default BoardsProvider;