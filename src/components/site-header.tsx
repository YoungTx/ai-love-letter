import Link from "next/link";
import { Github } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from 'next-intl';

export function SiteHeader() {
  const t = useTranslations('nav');
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <span className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
            <span className="font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 text-transparent bg-clip-text">
              Love Letter AI
            </span>
          </Link>

          <nav className="hidden md:flex gap-4">
            <Link 
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('about')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yourusername/ai-love-letter"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md w-9 h-9 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
} 