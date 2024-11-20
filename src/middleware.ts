import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // 创建响应对象
  const response = NextResponse.next();

  // 创建 Supabase 客户端
  const supabase = createMiddlewareClient({ 
    req: request, 
    res: response,
  });

  // 刷新 session
  const { data: { session }, error } = await supabase.auth.getSession();
  console.log('Middleware session:', { session, error });

  // 创建国际化中间件
  const intlMiddleware = createIntlMiddleware({
    locales: ['en', 'zh', 'ja'],
    defaultLocale: 'ja'
  });

  // 处理国际化路由
  const intlResponse = await intlMiddleware(request);

  // 从原始响应复制所有 headers 到国际化响应
  response.headers.forEach((value, key) => {
    intlResponse.headers.set(key, value);
  });

  // 从原始响应复制所有 cookies 到国际化响应
  response.cookies.getAll().forEach(cookie => {
    intlResponse.cookies.set({
      ...cookie,
      // 确保 cookie 可以被客户端访问
      httpOnly: false
    });
  });

  return intlResponse;
}

// 配置匹配路径
export const config = {
  matcher: [
    // 匹配所有路径，但排除特定路径
    '/((?!api|_next|_vercel|.*\\.|auth|supabase|favicon.ico).*)'
  ]
};
  