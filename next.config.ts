import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "http://192.168.10.11:3000",
    "http://localhost:3000",
    "http://69.62.116.59:3000",
    "http://69.62.116.59:4000",
    "http://69.62.116.59:4000/graphql",
    "*",
  ],

  webpack: (config, {}) => {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "src/app/(front)/assets/video/*", // Important for client-side rendering
              // outputPath: "static/media", // Where the file will be placed in the build output
            },
          },
        ],
      }
    );
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "69.62.116.59",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
