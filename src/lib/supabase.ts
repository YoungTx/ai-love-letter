import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";

// 客户端使用
export const createBrowserClient = () => {
  return createClientComponentClient<Database>();
};
