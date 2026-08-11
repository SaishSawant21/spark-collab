import { useEffect, useState } from "react"
import { BoardsContext } from "./BoardsContext";
import { fetchBoards } from "../services/boardService";
import { message } from "antd";
import { messageContants } from "../utils/constants";

const BoardsProvider = ({ children }) => {
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
      console.log("Failed to fetch boards:", error);
      setBoards([]);
      message.error(messageContants.somethingWerntWrong);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBoards();
  }, [])

  const values = {
    boards,
    setBoards,
    loading,
    loadBoards
  }
  return (
    <BoardsContext.Provider value={values}>
      {children}
    </BoardsContext.Provider>
  )
}

export default BoardsProvider