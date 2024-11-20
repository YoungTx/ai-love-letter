import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const locale = requestUrl.pathname.split('/')[1] || 'ja';
  
  console.log('Callback handler started:', {
    url: request.url,
    code: code ? 'exists' : 'missing',
    locale
  });

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data: { session }, error: authError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.redirect(new URL(`/${locale}/error`, requestUrl.origin));
    }

    if (session?.user) {
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select()
        .eq('id', session.user.id)
        .single();

      if ((!existingUser || fetchError?.code === 'PGRST116') && session.user.email) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata.name || session.user.email?.split('@')[0],
            avatar_url: session.user.user_metadata.avatar_url,
            provider: session.user.app_metadata.provider || 'github'
          });

        if (insertError) {
          console.error('Error creating user:', insertError);
        }
      }
    }
  }

  return NextResponse.redirect(new URL(`/${locale}`, requestUrl.origin));
} 