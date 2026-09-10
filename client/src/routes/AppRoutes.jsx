import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../pages/Auth/Login"));

const Registration = lazy(() => import("../pages/Auth/Registration"));

const ProfileUpdate = lazy(() => import("../pages/Auth/ProfileUpdate"));

const Dashboard = lazy(() => import("../pages/Dashboard"));

const Board = lazy(() => import("../pages/Board/Board"));

import BoardProvider from "../context/BoardProvider";

import BoardLayout from "../layouts/BoardLayout";

import ProtectedRoute from "./ProtectedRoutes";

import BoardRedirect from "./BoardRedirect";

import AppLayout from "../layouts/AppLayout";
import PageLoader from "../components/PageLoader";

const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));

const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));

const LinkExpired = lazy(() => import("../pages/Auth/LinkExpired"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/link-expired" element={<LinkExpired />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
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
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;