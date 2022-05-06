/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
    removeConsole: {
      exclude: ["error"],
    },
  },
};

module.exports = nextConfig;
