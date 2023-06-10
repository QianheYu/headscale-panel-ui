'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Go Web Mi\'use strict\'\n' +
  'const path = require(\'path\')\n' +
  'const defaultSettings = require(\'./src/settings.js\')\n' +
  '\n' +
  'function resolve(dir) {\n' +
  '  return path.join(__dirname, dir)\n' +
  '}\n' +
  '\n' +
  'const name = defaultSettings.title || \'Go Web Mini\' // page title\n' +
  '// const name = defaultSettings.title\n' +
  '\n' +
  '// If your port is set to 80,\n' +
  '// use administrator privileges to execute the command line.\n' +
  '// For example, Mac: sudo npm run\n' +
  '// You can change the port by the following method:\n' +
  '// port = 8080 npm run dev OR npm run dev --port = 8080\n' +
  'const port = process.env.port || process.env.npm_config_port || 8080 // dev port\n' +
  '\n' +
  '// All configuration item explanations can be find in https://cli.vuejs.org/config/\n' +
  'module.exports = {\n' +
  '  /**\n' +
  '   * You will need to set publicPath if you plan to deploy your site under a sub path,\n' +
  '   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,\n' +
  '   * then publicPath should be set to "/bar/".\n' +
  '   * In most cases please use \'/\' !!!\n' +
  '   * Detail: https://cli.vuejs.org/config/#publicpath\n' +
  '   */\n' +
  '  publicPath: \'/\',\n' +
  '  outputDir: \'dist\',\n' +
  '  assetsDir: \'static\',\n' +
  '  lintOnSave: process.env.NODE_ENV === \'development\',\n' +
  '  productionSourceMap: false,\n' +
  '  devServer: {\n' +
  '    port: port,\n' +
  '    open: true,\n' +
  '    overlay: {\n' +
  '      warnings: false,\n' +
  '      errors: true\n' +
  '    },\n' +
  '    proxy: {\n' +
  '      \'/api\': {\n' +
  '        target: process.env.VUE_APP_BASE_API,\n' +
  '        changeOrigin: true,\n' +
  '        pathRewrite: {\n' +
  '          \'^/api\': \'api\'\n' +
  '        }\n' +
  '      }\n' +
  '    }\n' +
  '  },\n' +
  '  configureWebpack: {\n' +
  '    // provide the app\'s title in webpack\'s name field, so that\n' +
  '    // it can be accessed in index.html to inject the correct title.\n' +
  '    name: name,\n' +
  '    resolve: {\n' +
  '      alias: {\n' +
  '        \'@\': resolve(\'src\')\n' +
  '      }\n' +
  '    }\n' +
  '  },\n' +
  '  chainWebpack(config) {\n' +
  '    // it can improve the speed of the first screen, it is recommended to turn on preload\n' +
  '    // it can improve the speed of the first screen, it is recommended to turn on preload\n' +
  '    config.plugin(\'preload\').tap(() => [\n' +
  '      {\n' +
  '        rel: \'preload\',\n' +
  '        // to ignore runtime.js\n' +
  '        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171\n' +
  '        fileBlacklist: [/\\.map$/, /hot-update\\.js$/, /runtime\\..*\\.js$/],\n' +
  '        include: \'initial\'\n' +
  '      }\n' +
  '    ])\n' +
  '\n' +
  '    // when there are many pages, it will cause too many meaningless requests\n' +
  '    config.plugins.delete(\'prefetch\')\n' +
  '\n' +
  '    // set svg-sprite-loader\n' +
  '    config.module\n' +
  '      .rule(\'svg\')\n' +
  '      .exclude.add(resolve(\'src/icons\'))\n' +
  '      .end()\n' +
  '    config.module\n' +
  '      .rule(\'icons\')\n' +
  '      .test(/\\.svg$/)\n' +
  '      .include.add(resolve(\'src/icons\'))\n' +
  '      .end()\n' +
  '      .use(\'svg-sprite-loader\')\n' +
  '      .loader(\'svg-sprite-loader\')\n' +
  '      .options({\n' +
  '        symbolId: \'icon-[name]\'\n' +
  '      })\n' +
  '      .end()\n' +
  '\n' +
  '    config\n' +
  '      .when(process.env.NODE_ENV !== \'development\',\n' +
  '        config => {\n' +
  '          config\n' +
  '            .plugin(\'ScriptExtHtmlWebpackPlugin\')\n' +
  '            .after(\'html\')\n' +
  '            .use(\'script-ext-html-webpack-plugin\', [{\n' +
  '            // `runtime` must same as runtimeChunk name. default is `runtime`\n' +
  '              inline: /runtime\\..*\\.js$/\n' +
  '            }])\n' +
  '            .end()\n' +
  '          config\n' +
  '            .optimization.splitChunks({\n' +
  '              chunks: \'all\',\n' +
  '              cacheGroups: {\n' +
  '                libs: {\n' +
  '                  name: \'chunk-libs\',\n' +
  '                  test: /[\\\\/]node_modules[\\\\/]/,\n' +
  '                  priority: 10,\n' +
  '                  chunks: \'initial\' // only package third parties that are initially dependent\n' +
  '                },\n' +
  '                elementUI: {\n' +
  '                  name: \'chunk-elementUI\', // split elementUI into a single package\n' +
  '                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app\n' +
  '                  test: /[\\\\/]node_modules[\\\\/]_?element-ui(.*)/ // in order to adapt to cnpm\n' +
  '                },\n' +
  '                commons: {\n' +
  '                  name: \'chunk-commons\',\n' +
  '                  test: resolve(\'src/components\'), // can customize your rules\n' +
  '                  minChunks: 3, //  minimum common number\n' +
  '                  priority: 5,\n' +
  '                  reuseExistingChunk: true\n' +
  '                }\n' +
  '              }\n' +
  '            })\n' +
  '          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk\n' +
  '          config.optimization.runtimeChunk(\'single\')\n' +
  '        }\n' +
  '      )\n' +
  '  }\n' +
  '}\nni' // page title
// const name = defaultSettings.title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 8080 npm run dev OR npm run dev --port = 8080
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
