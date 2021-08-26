module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            "likewise-stage.azureedge.net",
            "img.youtube.com",
            "avatars.githubusercontent.com",
            "scontent-mxp1-1.xx.fbcdn.net",
        ],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};
