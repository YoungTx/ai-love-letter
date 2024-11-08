import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    
    // 交换 code 获取会话
    const { data: { user }, error: authError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!authError && user) {
      // 检查用户是否已存在
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select()
        .eq('id', user.id)
        .single();

      // 当用户不存在时，fetchError.code 会是 'PGRST116'
      if ((!existingUser || fetchError?.code === 'PGRST116') && user.email) {
        // 创建新用户记录
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata.name || user.email?.split('@')[0],
            avatar_url: user.user_metadata.avatar_url,
            provider: 'github'
          });

        if (insertError) {
          console.error('Error creating user:', insertError);
        }
      }
    }
  }

  // 重定向到带有语言前缀的首页
  return NextResponse.redirect(new URL(`/${params.locale}`, requestUrl.origin));
} 