
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
module.exports = {
	configureWebpack: {
		devtool:'source-map',
		devServer:{
			disableHostCheck:true,
		},
        plugins: [
            new CompressionWebpackPlugin({
                test: /\.(js|css)?$/i,
                algorithm: 'gzip',
                deleteOriginalAssets: false
            }),
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path','aliasPath']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		]
	},
}




