/** @type {import('next').NextConfig} */
const nextConfig = {
    // async headers() {
    //     return [
    //       {
    //         source: '/:path*',
    //         headers: [
    //           {
    //             key: 'Cache-Control',
    //             // 60秒 * 24小时 * 10天 = 864000秒
    //             value: 'public, max-age=864000, s-maxage=864000,immutable'
    //           }
    //         ]
    //       }
    //     ]
    //   },
    experimental: {
        optimizePackageImports: [
            'next/dynamic',
            'next/router',
            'next/navigation',
            'react',
            'react-dom',
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-tabs',
            '@radix-ui/react-scroll-area',
            '@emoji-mart/react',
            '@livekit/components-react',
            'next/dist/compiled/react-dom',
            'next/dist/shared/lib/router',
            'date-fns',
            'lucide-react',
            '@radix-ui/react-popover'
        ],
        prefetch: true,
        transpilePackages: [
            '@livekit/components-react',
            '@livekit/components-styles'
        ],
        serverActions: true,
        // 启用更激进的树摇
        optimizePackages: true,
        // 启用 React 优化
        optimizeServerReact: true,
        // 改进模块追踪
        turbotrace: {
            contextDirectory: process.cwd(),
            processingTimeout: 5000,
            memoryLimit: 4096,
            // 包含常见的问题模块
            includedPackages: [
                'next',
                'react-dom',
                '@radix-ui',
                'lucide-react'
            ]
        },
        // 开启服务器组件优化
        serverComponentsExternalPackages: ['@prisma/client'],
        // 开启 CSS 优化
        optimizeCss: true,
        // 按需加载 polyfills
        polyfillsOptimization: true,
        // 优化产物输出
        output: 'standalone',
    },
    // 禁用不必要的导出
    modularizeImports: {
        '@radix-ui/react-*': {
            transform: '@radix-ui/react-{{member}}',
            preventFullImport: true,
            skipDefaultConversion: true
        },
        // 'lucide-react': {
        //     transform: 'lucide-react',
        //     preventFullImport: true,
        //     skipDefaultConversion: true
        // },
        // 'react': {
        //     transform: 'react',
        //     preventFullImport: true,
        //     skipDefaultConversion: true
        // },
        // 'react-dom': {
        //     transform: 'react-dom',
        //     preventFullImport: true,
        //     skipDefaultConversion: true
        // }
    },
    // 压缩代码
    swcMinify: true,
    compress: true,
    // 优化字体加载
    optimizeFonts: true,
    images: {
      domains: [
        "utfs.io",
        "m3ffntcagc.ufs.sh"
      ],
      deviceSizes: [640, 750, 828, 1080, 1200],
      imageSizes: [16, 32, 48, 64, 96, 128]
    }
  };
  
  export default nextConfig;