import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["api-homesoul.ufatitan.ru", "localhost", "127.0.0.1"],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
