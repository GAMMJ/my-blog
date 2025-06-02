/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
      },
      {
        protocol: 'https',
        hostname: 'blob.v0.dev',
      },
    ],
  },
  // 정적 파일 최적화
  compress: true,
  // 개발 환경에서 빠른 새로고침
  reactStrictMode: true,
  // 타입스크립트 빌드 시 타입 체크
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint 빌드 시 체크
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
