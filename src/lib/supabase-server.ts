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
            // 使用 Edge Runtime 兼容的方式设置 cookie
            try {
              if (value === '') {
                // 删除 cookie
                cookieStore.delete(name);
              } else {
                cookieStore.set(name, value, {
                  ...options,
                  // 确保 cookie 可以被客户端访问
                  httpOnly: false
                });
              }
            } catch (error) {
              console.error(`Error setting cookie ${name}:`, error);
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              // 使用 delete 而不是 set empty value
              cookieStore.delete(name);
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

    // 获取会话状态
    const {
      data: { session },
      error,
    } = await client.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      throw error;
    }

    return client;
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    throw error;
  }
}; 