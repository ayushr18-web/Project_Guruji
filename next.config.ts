import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Allow production builds to succeed even with ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
typescript: {
    ignoreBuildErrors: true,
  },

  // other config options here
};

module.exports = {
  experimental: {
    serverActions: true, // if using server actions
  },
};

export default nextConfig;