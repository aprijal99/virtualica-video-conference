/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVER_URL: 'https://virtualica-signaling-server.onrender.com',
  },
  output: 'standalone',
}

module.exports = nextConfig
