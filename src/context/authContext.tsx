import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
 }

 export const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
 });

export function AuthProvider({ children }: { children: React.ReactNode }) { 
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    // جلب الـ session الحالية عند تحميل التطبيق
    supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    setLoading(false);
    });

        // الاستماع لأي تغيير في حالة الـ auth (login / logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false)
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user: session?.user ?? null, session, loading }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};