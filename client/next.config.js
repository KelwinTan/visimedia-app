/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,

  images: { domains: ["dummyimage.com"] },
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ["error"],
    },
  },
};

module.exports = nextConfig;
