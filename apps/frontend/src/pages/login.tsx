import { supabase } from "@supabase/client.ts";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { type formData, LoginForm } from "@/components/login-form.tsx";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log({ error });
      } else {
        console.log("current user:", data.user);
        navigate("/"); // TODO: Navigate to dashboard instead.
      }
    };

    fetchSession();
  }, [navigate]);

  const handleSignup: SubmitHandler<formData> = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log({ error });
    } else {
      navigate("/"); // TODO: Navigate to dashboard instead.
    }
  };

  const handleLogin: SubmitHandler<formData> = async ({ email, password }) => {
    console.log("Login Clicked");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log({ error });
    } else {
      navigate("/"); // TODO: Navigate to dashboard instead.
    }
  };

  return (
    <div className={"flex h-screen justify-center items-center"}>
      <div className={"w-full"}>
        <LoginForm
          handleSignUp={handleSignup}
          handleLogin={handleLogin}
          className={"mx-auto max-w-3xl sm:max-md:max-w-xl"}
        />
      </div>
    </div>
  );
};
