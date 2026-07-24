import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "backend-test-dun.vercel.app",
      },
    ],
  },
};

export default nextConfig;
