import Link from "next/link";
import { useTranslations } from "next-intl";
import { AuthButton } from "./auth-button";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  const t = useTranslations();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">{t("title")}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("nav.about")}
            </Link>
          </nav>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  );
} 