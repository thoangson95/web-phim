/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "hhninja1.tv",
                port: "",
                pathname: "**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/a/**",
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve = {
                ...config.resolve,
                fallback: {
                    net: false,
                    dns: false,
                    tls: false,
                    assert: false,
                    path: false,
                    fs: false,
                    events: false,
                    process: false,
                    child_process: false,
                },
            };
        }
        config.module.exprContextCritical = false;
        return config;
    },
};

export default nextConfig;
