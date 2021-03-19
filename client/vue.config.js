const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    configureWebpack: { plugins: [new BundleAnalyzerPlugin()] },
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                @import "@/assets/_config.scss";
                `,
            },
        },
    },
};
