import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// 创建 next-intl 中间件
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'zh', 'ja'],
  defaultLocale: 'ja'
});

// 主中间件函数
export async function middleware(request: NextRequest) {
  try {
    // 创建基础响应
    const response = NextResponse.next();

    // 创建 Supabase 客户端
    const supabase = createMiddlewareClient({ req: request, res: response });

    // 先处理会话更新
    await supabase.auth.getSession();

    // 然后处理国际化路由
    const intlResponse = await intlMiddleware(request);

    // 合并 cookies
    response.cookies.getAll().forEach(cookie => {
      intlResponse.cookies.set(cookie.name, cookie.value, cookie.options);
    });

    return intlResponse;
  } catch (e) {
    console.error('Middleware error:', e);
    // 发生错误时至少保证国际化功能
    return intlMiddleware(request);
  }
}

// 配置匹配路径
export const config = {
  matcher: [
    // 匹配所有路径，但排除特定路径
    '/((?!api|_next|_vercel|.*\\.|auth|supabase|favicon.ico).*)'
  ]
};
  