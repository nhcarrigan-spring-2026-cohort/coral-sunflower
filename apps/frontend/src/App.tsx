import { StrictMode } from "react";
import { RouterProvider } from "react-router/dom";
import { UserProvider } from "@/context/userContext.tsx";
import { router } from "./routes.tsx";

export const App = () => {
  return (
    <StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </StrictMode>
  );
};
