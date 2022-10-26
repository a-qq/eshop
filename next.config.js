/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ["naszsklep-api.vercel.app", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"]
  },
};

module.exports = nextConfig
