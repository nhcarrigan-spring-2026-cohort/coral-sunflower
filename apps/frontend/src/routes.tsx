import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "@/components/protected-route.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Login } from "./pages/login.tsx";

export const router = createBrowserRouter([
  {
    element: <Navigate to="/dashboard" />,
    path: "/",
  },
  {
    Component: Login,
    path: "login",
  },
  {
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    path: "dashboard",
  },
]);
