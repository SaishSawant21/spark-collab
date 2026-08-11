import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Board from "../pages/Board/Board";
import BoardProvider from "../context/BoardProvider";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/board"
            element={
              <BoardProvider>
                <AppLayout>
                  <Board />
                </AppLayout>
              </BoardProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
