import type React from "react";
import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "@/context/userContext.tsx";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user !== null ? children : <Navigate to={"/login"} />;
}
