/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SERVER_URL: 'https://virtualica-signaling-server.onrender.com',
    NEXT_PUBLIC_WEBSOCKET_URL: 'wss://virtualica-signaling-server.onrender.com/socket',
  },
  output: 'standalone',
}

module.exports = nextConfig
