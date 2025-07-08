/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false,      // hides "Compiling..." indicator
    autoPrerender: false,      // (optional) hides prerender info
  },
}

export default nextConfig
