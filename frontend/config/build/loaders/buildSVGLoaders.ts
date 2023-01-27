export const buildSvgLoaders = () => ({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
});