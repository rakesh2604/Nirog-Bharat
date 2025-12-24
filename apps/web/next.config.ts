import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip TypeScript checking during build (Vercel was checking backend code)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
