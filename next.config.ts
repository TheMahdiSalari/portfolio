import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // دامنه آپلودتینگ
      },
    ],
  },
};

export default nextConfig;