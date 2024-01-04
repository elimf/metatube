/** @type {import('next').NextConfig} */
const nextConfig = {};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

module.exports = {
  images: {
    domains: ["via.placeholder.com", "localhost", "metatubeapi.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: API_URL,
        port: "",
        pathname: "**",
      },
    ],
  },
};
