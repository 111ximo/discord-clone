import TerserPlugin from 'terser-webpack-plugin';
import analyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil"
        });
        // if(dev){
        //     config.optimization = {
        //         minimize: true,
        //         minimizer: [
        //             new TerserPlugin({
        //                 terserOptions: {
        //                     compress: {
        //                         drop_console: true,
        //                         pure_funcs: ['console.log']
        //                     }
        //                 }
        //             })
        //         ],
        //         splitChunks: {
        //             chunks: 'all',
        //             minSize: 20000,
        //             maxSize: 244000,
        //             cacheGroups: {
        //                 // 第三方库单独打包
        //                 vendors: {
        //                     test: /[\\/]node_modules[\\/]/,
        //                     name: 'vendors',
        //                     chunks: 'all',
        //                     priority: 10
        //                 },
        //                 // 公共组件单独打包
        //                 commons: {
        //                     name: 'commons',
        //                     minChunks: 2,
        //                     chunks: 'all',
        //                     priority: 5
        //                 },
        //                 // 默认配置
        //                 default: {
        //                     minChunks: 2,
        //                     priority: -20,
        //                     reuseExistingChunk: true
        //                 }
        //             }
        //         }
        //     };
    
        //     config.module.rules.push({
        //         test: /\.worker\.(js|ts)$/,
        //         use: [
        //             {
        //                 loader: 'worker-loader',
        //                 options: {
        //                     filename: '[name].[contenthash].worker.js',
        //                 },
        //             },
        //         ],
        //     })
        // }
            
        return config;
    },
    compress: true,
    images: {
        domains: [
            "utfs.io",
            "m3ffntcagc.ufs.sh"
        ],
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96, 128]
    },
    experimental: {
        optimizeCss: true
    }
};

// 使用 withBundleAnalyzer 包裹 nextConfig 配置
export default withBundleAnalyzer(nextConfig);
//export default nextConfig;