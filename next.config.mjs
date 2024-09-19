/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
        dangerouslyAllowSVG: true,
        domains: [""],
      },
};

export default nextConfig;
