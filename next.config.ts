import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ark-react",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
