import { supabase } from "@supabase/client.ts";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { type formData, LoginForm } from "@/components/login-form.tsx";

export const Login = () => {
  const navigate = useNavigate();

  const handleSignup: SubmitHandler<formData> = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.log({ error });
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogin: SubmitHandler<formData> = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log({ error });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className={"flex h-screen justify-center items-center"}>
      <div className={"w-full"}>
        <LoginForm
          className={"mx-auto max-w-3xl sm:max-md:max-w-xl"}
          handleLogin={handleLogin}
          handleSignUp={handleSignup}
        />
      </div>
    </div>
  );
};
