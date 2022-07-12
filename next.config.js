module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/create-account",
                destination: "/sign-up",
                permanent: true,
            },
        ];
    },
};
