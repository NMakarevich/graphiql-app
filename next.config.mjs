/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  env: {},
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@use "./src/styles/scss/tools/vars" as v;@use "./src/styles/scss/tools/mixins" as m;@use "./src/styles/scss/tools/functions" as f;@use "./src/styles/scss/tools/extends";`,
  },
  output: 'standalone',
  distDir: './dist',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
