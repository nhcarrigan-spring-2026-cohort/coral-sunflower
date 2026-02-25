import { supabase } from "@supabase/client.ts";
import type { User } from "@supabase/supabase-js";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
    }
  };

  const handleLogin = async () => {
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
    <div>
      <div>
        <h2>Login to Coral Sunflower</h2>
        {error && <p>{error}</p>}

        {user ? (
          <div>
            <p>Logged in as {user.email}</p>
            <button type={"button"} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <button type={"button"} onClick={handleSignup}>
                Sign Up
              </button>
              <button type={"button"} onClick={handleLogin}>
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
