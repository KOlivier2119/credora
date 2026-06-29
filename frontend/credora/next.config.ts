import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["s3-alpha-sig.figma.com"],
  },
};

export default nextConfig;
