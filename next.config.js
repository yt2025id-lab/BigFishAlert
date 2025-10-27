/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},

  // Generate build ID to bust cache on new deployments
  generateBuildId: async () => {
    // Use timestamp to ensure unique build ID per deployment
    return `build-${Date.now()}`;
  },

  // Headers to control caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
