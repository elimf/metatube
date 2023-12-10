/** @type {import('next').NextConfig} */
module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || "http://localhost:1337",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};
