import { createServerClient } from '@/lib/supabase-server';
import { getTranslations } from 'next-intl/server';
import { LoveLetterCard } from '@/components/love-letter-card';
import { cookies } from 'next/headers';

export default async function HistoryPage() {
  const t = await getTranslations('history');
  const supabase = await createServerClient();
  
  const cookieStore = cookies();
  console.log('Cookies:', cookieStore.getAll());
  
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    console.error('Session error:', sessionError);
  }
  
  console.log('Session:', session);
  
//   if (!session) {
//     console.log('No session found, redirecting to home');
//     redirect('/');
//   }
  
  try {
    const { data: letters, error } = await supabase
      .from('love_letters')
      .select(`
        *,
        _count {
          favorites
        }
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching letters:', error);
      throw error;
    }

    return (
      <div className="container max-w-6xl py-8">
        <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {letters?.map((letter) => (
            <LoveLetterCard key={letter.id} letter={letter} />
          ))}
          
          {letters?.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              {t('noLetters')}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Page error:', error);
    return (
      <div className="container max-w-6xl py-8">
        <div className="text-center text-destructive">
          发生错误，请刷新页面重试
        </div>
      </div>
    );
  }
} 