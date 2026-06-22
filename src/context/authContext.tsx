import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import { AuthContext } from "../lib/authContext";

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // 
    useEffect(() => {
        const getUser = async () => {
            const {data:{ user }} = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();

        const {data: { subscription }} = supabase.auth.onAuthStateChange((_, session) => {
                setUser(session?.user ?? null);
            });

        return () => subscription.unsubscribe();
    }, []);

    return (
    <AuthContext.Provider
        value={{
        user,
        loading,
    }}
    >
        {children}
    </AuthContext.Provider>
    );
};