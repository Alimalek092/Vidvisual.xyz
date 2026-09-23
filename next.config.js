/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ['youtube-transcript', 'razorpay'] },
};
module.exports = nextConfig;
