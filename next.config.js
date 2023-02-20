/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["localhost", "https://nktimesapi.nktone.com"] },
  //assetPrefix: ".",
};

module.exports = nextConfig;
