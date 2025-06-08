import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Allow production builds to succeed even with ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  // other config options here
};

export default nextConfig;