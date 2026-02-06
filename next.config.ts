import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["gsap", "swiper"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    dangerouslyAllowSVG: true,

    
    // ✅ Use remotePatterns instead of domains (Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dl.dropboxusercontent.com',
        pathname: '/**',
      },
    ],
    
    // ✅ Add optimization settings
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
