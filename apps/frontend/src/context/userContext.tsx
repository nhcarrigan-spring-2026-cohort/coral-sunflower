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
      if (error) {
        console.log({ error });
      } else if (data.user) {
        setUser(data.user);
      }
      setIsLoading(false);
    };
    fetchSession();

    const subscription = supabase.auth.onAuthStateChange((a, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ isLoading, user }}>{children}</UserContext.Provider>;
};
