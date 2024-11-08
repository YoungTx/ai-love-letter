"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const setupAuth = async () => {
      try {
        // 获取初始会话
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        // 设置认证状态监听
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state changed in provider:', event, session);
          setUser(session?.user ?? null);
          
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            router.refresh();
          } else if (event === 'SIGNED_OUT') {
            router.refresh();
          }
        });

        setLoading(false);
        return subscription;
      } catch (error) {
        console.error('Auth setup error:', error);
        setLoading(false);
      }
    };

    const subscription = setupAuth();
    
    return () => {
      subscription.then(sub => sub?.unsubscribe());
    };
  }, [supabase, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 