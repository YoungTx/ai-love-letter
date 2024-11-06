import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import NextAuth from 'next-auth';
import { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (!user.email) return false;
      
      const supabase = createRouteHandlerClient({ cookies });
      
      // 检查用户是否存在
      const { data: existingUser } = await supabase
        .from('users')
        .select()
        .eq('email', user.email)
        .single();

      if (!existingUser) {
        // 创建新用户
        const { error } = await supabase.from('users').insert({
          id: user.id,
          email: user.email,
          name: user.name,
          avatar_url: user.image,
          provider: account?.provider,
        });

        if (error) {
          console.error('Error creating user:', error);
          return false;
        }
      }
      
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 