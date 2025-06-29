/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push({
                "utf-8-validate": "commonjs utf-8-validate",
                bufferutil: "commonjs bufferutil"
            });
        }
        return config;
    },
    typescript: {
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io'
            },
            {
                protocol: 'https',
                hostname: 'm3ffntcagc.ufs.sh'
            }
        ],
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96, 128]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb'
        }
    },
    transpilePackages: ['@vercel/speed-insights'],
};

export default nextConfig;