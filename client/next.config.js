const devConfig = require("./next.dev");
const prodConfig = require("./next.prod");

const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...config,
  images: { domains: ["dummyimage.com"] },
  env: {},
};

module.exports = nextConfig;
