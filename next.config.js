/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/indproj",
  images: {
    unoptimized: true,
  },
  assetPrefix: "/indproj",
};

module.exports = nextConfig;
