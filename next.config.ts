import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.31.55"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "me7aitdbxq.ufs.sh" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: 'https',
        hostname: 'dl.dropboxusercontent.com',
        port: '',
        pathname: '/**',
      },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "plus.unsplash.com" }
    ],
  },
};

export default nextConfig;
