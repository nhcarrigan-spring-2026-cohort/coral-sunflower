import type React from "react";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "@/context/userContext.tsx";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useContext(UserContext);
  console.log("Checking if user is logged in Protected Route: ", user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user !== null ? children : <Navigate to={"/login"} />;
}
