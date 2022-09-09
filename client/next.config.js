const devConfig = require("./next.dev");
const prodConfig = require("./next.prod");

const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...config,
  reactStrictMode: false,
  images: { domains: ["api.visimediasupplies.id", "enterkomputer.com"] },
  env: {
    API_URL: "https://api.visimediasupplies.id/api",
    IMAGE_URL: "https://api.visimediasupplies.id/",
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
