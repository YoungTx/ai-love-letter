import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: false
  }
};

export default withNextIntl(config);
