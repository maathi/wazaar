import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        // pathname: "/200/300",
        search: "",
      },
    ],
  },
}

export default nextConfig
