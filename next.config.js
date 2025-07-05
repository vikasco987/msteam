/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],  // ← add this line
  },
};

module.exports = nextConfig;
