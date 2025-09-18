/** @type {import('next').NextConfig} */

const nextConfig = {
    
     output: 'export', 
    images: {
        domains: [
            'images.unsplash.com',
            'api.dicebear.com',
            'xcjytosyrxtbqqbwqkce.supabase.co'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'xcjytosyrxtbqqbwqkce.supabase.co',
                port: '',
                pathname: '/**',
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
    },
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production'
    }
    
};

module.exports = nextConfig;