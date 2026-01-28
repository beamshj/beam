import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: true, // ← This one line = 40-50% improvement!
    optimizePackageImports: ["gsap", "swiper"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    dangerouslyAllowSVG: true,
    // unoptimized: true,
    // domains: ["dl.dropboxusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
        pathname: "/**",
      },
    ],
    // ✅ Add image optimization settings
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
