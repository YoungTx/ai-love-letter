import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'zh', 'ja'] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ja: '🇯🇵 日本語',
  en: '🇺🇸 English',
  zh: '🇨🇳 中文'
};

export const defaultLocale: Locale = 'ja';

export const timeZone = 'Asia/Tokyo'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./locales/${locale}.json`)).default,
  timeZone
})); 