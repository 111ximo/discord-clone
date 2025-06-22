/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        if (isServer) {
            config.externals.push({
                "utf-8-validate": "commonjs utf-8-validate",
                bufferutil: "commonjs bufferutil"
            });
        }
        // // 服务器端配置
        // if (isServer) {
        //     config.externals.push({
        //         "utf-8-validate": "commonjs utf-8-validate",
        //         bufferutil: "commonjs bufferutil"
        //     });
        // }

        // // 客户端优化配置
        // if (!isServer) {
        //     config.optimization.splitChunks = {
        //         chunks: 'all',
        //         minSize: 20000,
        //         cacheGroups: {
        //             // 关键依赖单独打包
        //             critical: {
        //                 test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
        //                 name: 'critical',
        //                 priority: 50,
        //                 enforce: true,
        //             },
        //             // 其他依赖合并打包
        //             vendors: {
        //                 test: /[\\/]node_modules[\\/]/,
        //                 name: 'vendors',
        //                 priority: 20,
        //                 reuseExistingChunk: true,
        //             }
        //         }
        //     };

        //     config.optimization.minimize = true;
        // }

        return config;
    },
    // 禁用 TypeScript 类型检查
    typescript: {
        ignoreBuildErrors: true
    },
    // compress: true,
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
        optimizeCss: true,
        // 添加服务器组件配置
        serverComponents: true,
        // 添加错误处理配置
        serverActions: true,
        // 修复 SSR 渲染问题
        esmExternals: 'loose'
    }
};

export default nextConfig;