/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    console.log('rewrites')
    return [
      {
        source: "/main/:path*",
        destination: "https://hgm-main.p-e.kr/:path*"
      },
      {
        source: '/ml/:path*',
        destination: 'https://hgm-ml.p-e.kr/:path*'
      }
    ]
  }
}

module.exports = nextConfig
