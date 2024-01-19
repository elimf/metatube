const nextConfig = {};

module.exports = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
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
        hostname: NEXT_PUBLIC_API_URL,
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
