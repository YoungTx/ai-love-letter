import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from 'next-intl/server';
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider } from "@/providers/auth-provider";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI三行情书生成器",
  description: "使用AI生成浪漫的三行情书",
};

async function getMessages(locale: string) {
  try {
    return (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    notFound();
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" />  
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Providers messages={messages} locale={locale}>
            <div className="relative min-h-screen flex flex-col">
              <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-background to-background" />
              
              <SiteHeader />
              
              <main className="flex-1">
                {children}
              </main>
              
              <SiteFooter />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
} 