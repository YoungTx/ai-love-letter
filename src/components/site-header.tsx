import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";

export function SiteHeader() {
  const t = useTranslations();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">{t('title')}</span>
          </a>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
} 