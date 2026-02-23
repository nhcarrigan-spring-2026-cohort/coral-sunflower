import { createBrowserRouter } from "react-router";
import { Hello } from "./pages/login.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "login",
    element: <Hello />,
  },
]);
