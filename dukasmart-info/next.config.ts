
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            'firebase-admin': false,
            fs: false,
            module: false,
        };
    }
    return config;
  },
};

export default nextConfig;
