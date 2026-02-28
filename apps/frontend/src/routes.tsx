import { createBrowserRouter, Outlet } from "react-router";
import { ProtectedRoute } from "@/components/protected-route.tsx";
import { Login } from "./pages/login.tsx";
import MyPlot from "./pages/MyPlot/MyPlotPage";

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
    children: [
      {
        path: "my-plot",
        element: <MyPlot />
      },
    ],
    element: (
      <ProtectedRoute>
        <div>Dashboard</div>
        <Outlet />
      </ProtectedRoute>
    ),
    path: "dashboard",
  },
]);
