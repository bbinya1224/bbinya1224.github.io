import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 정적 사이트 생성
  images: {
    unoptimized: true, // 이미지 최적화 끄기
  },
  basePath: process.env.NODE_ENV === 'production' ? '' : undefined,
};

export default nextConfig;
