import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath: '/your-repo-name', // 👈 important!
  // assetPrefix: '/your-repo-name/',
};

export default nextConfig;

// module.exports = nextConfig;
