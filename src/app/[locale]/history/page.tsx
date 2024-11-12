import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { LoveLetterCard } from '@/components/love-letter-card';

export default async function HistoryPage() {
  const t = await getTranslations('history');
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/');
  }
  
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
} 