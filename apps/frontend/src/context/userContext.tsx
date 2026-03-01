import { supabase } from "@supabase/client.ts";
import type { User } from "@supabase/supabase-js";
import type React from "react";
import { createContext, useEffect, useMemo, useState } from "react";

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
      } else {
        setUser(data.user);
      }
      setIsLoading(false);
    };
    fetchSession();

    const subscription = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  const contextValue = useMemo(() => ({ isLoading, user }), [isLoading, user]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
