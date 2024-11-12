import withPWA from 'next-pwa';

const nextPWAConfig = {
  dest: 'public',
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your Next.js configuration here
};

export default withPWA(nextConfig);
