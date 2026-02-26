import { supabase } from "@supabase/client.ts";
import type { User } from "@supabase/supabase-js";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { LoginForm } from "@/components/login-form.tsx";
import { Button } from "@/components/ui/button.tsx";

type formInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<formInputs>();

  const handleSignup: SubmitHandler<formInputs> = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
    }
  };

  const handleLogin: SubmitHandler<formInputs> = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className={"flex h-screen justify-center items-center"}>
      <div className={"w-full"}>
        <h2 className={"bg-amber-50"}>Login to Coral Sunflower</h2>
        {error && <p>{error}</p>}

        {user ? (
          <div>
            <p>Logged in as {user.email}</p>
            <Button type={"button"} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <input {...register("email")} type="email" placeholder="Email" />
            <input {...register("password")} type="password" placeholder="Password" />
            <div>
              <Button type={"button"} onClick={handleSubmit(handleSignup)}>
                Sign Up
              </Button>
              <Button type={"button"} onClick={handleSubmit(handleLogin)}>
                Login
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
