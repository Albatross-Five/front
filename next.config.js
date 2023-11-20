/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://hgm-main.p-e.kr/:path*'
      },
      {
        source: '/ml/:path*',
        destination: 'https://hgm-ml.p-e.kr/:path*'
      }
    ]
  }
}

module.exports = nextConfig
