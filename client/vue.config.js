module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                @import "@/assets/_config.scss";
                `
            }
        }
    }
}