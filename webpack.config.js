'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: ['babel-polyfill', './client/js'],//, './node_modules/materialize-css/dist/js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client')
    },
    module: {
        rules: [{
            test: /\.js$/, // запустим загрузчик во всех файлах .js
            exclude: /node_modules/, // проигнорируем все файлы в папке  node_modules 
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })
      ]
};