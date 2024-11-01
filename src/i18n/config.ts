import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'zh', 'ja'] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
};

export const defaultLocale: Locale = 'zh';

export const timeZone = 'Asia/Tokyo'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./locales/${locale}.json`)).default,
  timeZone
})); 