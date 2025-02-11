import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["s3-alpha-sig.figma.com"], // Allow images from Figma's CDN
  },
};

export default nextConfig;
