import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "api-homesoul.ufatitan.ru", // Ваш Strapi домен
      "localhost", // Для разработки
      "127.0.0.1", // Для разработки
    ],
    formats: ["image/webp", "image/avif"], // Поддержка современных форматов
  },
};

export default nextConfig;
