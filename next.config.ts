import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Allow images from this domain
  },
  // Any other config options you may have
};

export default nextConfig;
