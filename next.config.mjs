import withPWA from 'next-pwa';

const nextPWAConfig = {
  dest: 'public',
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // If you’re using the `app` directory structure.
  },
  pwa: {
    dest: 'public',
  },
};

// module.exports = nextConfig;


export default withPWA(nextPWAConfig);
