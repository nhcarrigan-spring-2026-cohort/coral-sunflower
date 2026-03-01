import path from "node:path";
import { createBrowserRouter, Outlet } from "react-router";
import { ComponentExample } from "@/components/component-example.tsx";
import { ProtectedRoute } from "@/components/protected-route.tsx";
import { Login } from "./pages/login.tsx";

export const router = createBrowserRouter([
  {
    element: <div>Hello World</div>,
    path: "/",
  },
  {
    Component: Login,
    path: "login",
  },
  {
    children: [],
    element: (
      <ProtectedRoute>
        <div>Dashboard</div>
        <Outlet />
      </ProtectedRoute>
    ),
    path: "dashboard",
  },
]);
