"use client";

import { timeZone } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";

type ProvidersProps = {
  children: React.ReactNode;
  messages: Record<string, string>;
  locale: string;
};

export function Providers({ children, messages, locale }: ProvidersProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
