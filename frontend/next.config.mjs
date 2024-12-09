/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty");
    return config;
  },
};

export default nextConfig;
