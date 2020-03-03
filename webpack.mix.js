const mix = require('laravel-mix');
const path = require('path');
require('laravel-mix-purgecss');
require('laravel-vue-lang/mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 | This boilerplate adds aliases for easy importation, and uses
 | TypeScript, PostCSS and PurgeCSS.
 |
 */

mix

  // Application entry file
  .ts('resources/js/app.ts', 'public/build')

  // Registers CSS and PostCSS
  .postCss('resources/css/app.css', 'public/build', require('./postcss.config').plugins)

  // Adds webpack rules
  .webpackConfig({
    // Code splitting options
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },

    // Adds aliases for cleaner import
    resolve: {
      alias: {
        vue$: path.resolve('vue/dist/vue.runtime.esm.js'),
        '@': path.resolve('./resources/js'),
      },
    },

    // Translator loader
    module: {
      rules: [
        {
          test: /\.(postcss)$/,
          use: ['vue-style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
        },
      ],
    },
  })

  // Adds babel plugins
  .babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
  })

  // Registers PurgeCSS
  .purgeCss({
    content: [
      './src/**/*.php', // `/app` by default, but this boilerplate uses `/src`
      './resources/**/*.html',
      './resources/**/*.js',
      './resources/**/*.jsx',
      './resources/**/*.ts',
      './resources/**/*.tsx',
      './resources/**/*.php',
      './resources/**/*.vue',
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/],
  })

  // Enables localization
  .lang()

  // Enables versioning
  .version()
  .sourceMaps();
