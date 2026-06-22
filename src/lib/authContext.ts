import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

type AuthContextValue = {
    user: User | null;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export type { AuthContextValue };
