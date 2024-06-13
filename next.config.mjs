/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                port: '',
            },
        ],
        unoptimized: true,
    },
    output: 'export',
    transpilePackages: ['next-mdx-remote'],
    basePath: process.env.BASE_URL,
};

export default nextConfig;
