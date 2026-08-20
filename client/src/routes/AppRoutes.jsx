import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Board from "../pages/Board/Board";
import BoardProvider from "../context/BoardProvider";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoutes";
import BoardRedirect from "./BoardRedirect";
import Dashboard from "../pages/Dashboard";
import Registration from "../pages/Auth/Registration";
import ProfileUpdate from "../pages/Auth/ProfileUpdate";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<BoardRedirect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
          <Route
            path="/board"
            element={
              <ProtectedRoute />
            }
          >
            <Route index element={<BoardRedirect />} />
            <Route
              path=":boardId"
              element={
                <BoardProvider>
                  <AppLayout>
                    <Board />
                  </AppLayout>
                </BoardProvider>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
