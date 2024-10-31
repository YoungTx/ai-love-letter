import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

/** @type {import('next').NextConfig} */
const config = {
  // 您的其他 Next.js 配置
};

export default withNextIntl(config);
