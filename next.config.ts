import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {

  compiler: {

    removeConsole: process.env.NODE_ENV === "production",

  },

  images: {

    dangerouslyAllowSVG: true,

    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [

      {

        protocol: "https",

        hostname: "dl.dropboxusercontent.com",

        pathname: "/**",

      },

    ],

    formats: ["image/webp", "image/avif"],

    deviceSizes: [640, 750, 828, 1080, 1200, 1920],

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    minimumCacheTTL: isDev ? 0 : 31536000,

  },

  compress: true,

  productionBrowserSourceMaps: false,

  async headers() {

    if (isDev) {

      // 🚫 Disable all caching in development

      return [

        {

          source: "/:path*",

          headers: [

            {

              key: "Cache-Control",

              value: "no-store, no-cache, must-revalidate, proxy-revalidate",

            },

          ],

        },

      ];

    }

    return [

      // ✅ Static images

      {

        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif)",

        headers: [

          {

            key: "Cache-Control",

            value: "public, max-age=31536000, immutable",

          },

        ],

      },

      // ✅ Next.js static assets

      {

        source: "/_next/static/:path*",

        headers: [

          {

            key: "Cache-Control",

            value: "public, max-age=31536000, immutable",

          },

        ],

      },

      // ✅ Fonts

      {

        source: "/fonts/:path*",

        headers: [

          {

            key: "Cache-Control",

            value: "public, max-age=31536000, immutable",

          },

        ],

      },

      // 🚫 NEVER cache HTML / ISR / App Router pages

      {

        source: "/((?!_next/static|fonts|.*\\.(?:png|jpg|jpeg|webp|avif|svg|js|css)).*)",

        headers: [

          {

            key: "Cache-Control",

            value: "no-store",

          },

        ],

      },

    ];

  },

};

const withPWA = require("next-pwa")({

  dest: "public",

  register: true,

  skipWaiting: true,

  disable: isDev,

  // 🔐 SAFE runtime caching — ASSETS ONLY

  runtimeCaching: [

    // Google Fonts

    {

      urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,

      handler: "CacheFirst",

      options: {

        cacheName: "google-fonts-webfonts",

        expiration: {

          maxEntries: 4,

          maxAgeSeconds: 365 * 24 * 60 * 60,

        },

      },

    },

    // Images

    {

      urlPattern: /\.(?:png|jpg|jpeg|webp|avif|svg|ico)$/i,

      handler: "CacheFirst",

      options: {

        cacheName: "images",

        expiration: {

          maxEntries: 60,

          maxAgeSeconds: 7 * 24 * 60 * 60,

        },

      },

    },

    // Next.js static JS chunks

    {

      urlPattern: /\/_next\/static\/.+\.js$/i,

      handler: "CacheFirst",

      options: {

        cacheName: "next-static-js",

        expiration: {

          maxEntries: 40,

          maxAgeSeconds: 7 * 24 * 60 * 60,

        },

      },

    },

  ],

});

export default withPWA(nextConfig);

