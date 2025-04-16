import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/MatheusGrilo/XML-Facil-VSM/main/.gitassets/*",
      },
    ],
  },
};

export default nextConfig;
