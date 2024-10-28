/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/indproj",
  // robotsTxtOptions: {
  //   policies: [{ userAgent: "*" }],
  // },
  images: {
    unoptimized: true,
  },
  assetPrefix: "/indproj",
};

module.exports = nextConfig;
