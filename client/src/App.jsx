import { useContext, useEffect } from "react";
import { socket } from "./socket";
import Board from "./pages/Board/Board";
import AppLayout from "./layouts/AppLayout";
import BoardProvider from "./context/BoardProvider";
import { authenticateUser } from "./services/authService";
import AuthProvider from "./context/AuthProvider";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Auth/Login";

function App() {
  const AppContent = () => {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
      return <Login />;
    }

    return (
      <BoardProvider>
        <AppLayout>
          <Board />
        </AppLayout>
      </BoardProvider>
    );
  };

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App;