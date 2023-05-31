/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVER_URL: 'http://localhost:7181',
  },
  // output: 'standalone',
}

module.exports = nextConfig
