/** @type {import('next').NextConfig} */
const nextConfig = {};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

module.exports = {
  images: {
    domains: [
      "via.placeholder.com",
      "localhost",
      "metatubeapi.onrender.com",
      "api.dicebear.com",
    ],
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
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/7.x/lorelei/svg",
      },
    ],
  },
};
