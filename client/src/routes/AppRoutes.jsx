import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import ProfileUpdate from "../pages/Auth/ProfileUpdate";
import Dashboard from "../pages/Dashboard";

import Board from "../pages/Board/Board";
import BoardProvider from "../context/BoardProvider";

import BoardLayout from "../layouts/BoardLayout";

import ProtectedRoute from "./ProtectedRoutes";
import BoardRedirect from "./BoardRedirect";
import AppLayout from "../layouts/AppLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<BoardRedirect />} />

          {/* Normal App Pages */}
          <Route element={<AppLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/my-profile"
              element={<ProfileUpdate />}
            />
          </Route>

          {/* Board */}
          <Route
            path="/board/:boardId"
            element={
              <BoardProvider>
                <BoardLayout>
                  <Board />
                </BoardLayout>
              </BoardProvider>
            }
          />

          <Route
            path="/board"
            element={<BoardRedirect />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;