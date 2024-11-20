import { createServerClient as createSupabaseServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

// 服务器端使用
export const createServerClient = async () => {
  const cookieStore = cookies();

  try {
    const client = createSupabaseServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = cookieStore.get(name);
            if (!cookie) return undefined;
            
            // 如果值是 JSON 数组字符串，取第一个元素（access token）
            try {
              const parsed = JSON.parse(cookie.value);
              return Array.isArray(parsed) ? parsed[0] : cookie.value;
            } catch {
              return cookie.value;
            }
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch (error) {
              console.error(`Error setting cookie ${name}:`, error);
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: "", ...options });
            } catch (error) {
              console.error(`Error removing cookie ${name}:`, error);
            }
          },
        },
        auth: {
          detectSessionInUrl: true,
          persistSession: true,
        },
      }
    );

    const { data, error } = await client.auth.getSession();
    if (error) {
      console.error('Error getting session:', error, data);
    }
    console.log('client==',await client.auth.getUser());
    
    return client;
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    throw error;
  }
}; 