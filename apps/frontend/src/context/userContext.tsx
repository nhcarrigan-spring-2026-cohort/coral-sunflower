import { supabase } from "@supabase/client.ts";
import type { User } from "@supabase/supabase-js";
import type React from "react";
import { createContext, useEffect, useState } from "react";

type UserContext = {
  isLoading: boolean;
  user: User | null;
};

export const UserContext = createContext<UserContext>({ isLoading: true, user: null });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("supabase user awaited");
      if (error) {
        console.log({ error });
      } else if (data.user) {
        setUser(data.user);
        console.log("current user:", data.user?.email);
      }
      setIsLoading(false);
    };
    console.log("Fetching session");
    fetchSession();

    console.log("Fetching onAuthStateChange");
    const subscription = supabase.auth.onAuthStateChange((a, session) => {
      console.log({ a, session });
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      console.log("Unsubscribing from onAuthStateChange");
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ isLoading, user }}>{children}</UserContext.Provider>;
};
