import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // JavaScript files, e.g. MarsAIWeb/Build/.framework.js.gz
        source: '/MarsAIWeb/Build/:all*.js.gz',
        headers: [
          { key: 'Content-Encoding', value: 'gzip' },
          { key: 'Content-Type', value: 'application/javascript' },
        ],
      },
      {
        // Data files, e.g. MarsAIWeb/Build/.data.gz
        source: '/MarsAIWeb/Build/:all*.data.gz',
        headers: [
          { key: 'Content-Encoding', value: 'gzip' },
          { key: 'Content-Type', value: 'application/octet-stream' },
        ],
      },
      {
        // WebAssembly files, e.g. MarsAIWeb/Build/.wasm.gz
        source: '/MarsAIWeb/Build/:all*.wasm.gz',
        headers: [
          { key: 'Content-Encoding', value: 'gzip' },
          { key: 'Content-Type', value: 'application/wasm' },
        ],
      },
      // You can add more rules if your build includes other gzipped file types.
    ];
  },
};

export default nextConfig;
