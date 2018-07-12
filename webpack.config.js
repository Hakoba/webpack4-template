let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let conf = {
    entry: './src/index.js', // Дефолтные настройки
    output: {
        path: path.resolve(__dirname,'./dist') , 
        filename: 'main.js',
        publicPath: '/dist/'
    },
    devServer: {
        overlay: true
    },
    module:{
        rules:[
            {
                test: /\.js/,
                loader: 'babel-loader',
               // exclude: '/node_modules/'  // исключения если код из нод модулэс es6 то прогонять через бабель не надо
            },
            {
                test: /\.s.ss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader'],
                })

              },
             {
                  test: /.*\.(gif|png|jpe?g|svg|ico)$/i,
                  use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: 'img/[name].[ext]',
                        publicPath: './'
                      }
                    },
                  ]
            }

        ]
    },
    plugins: [ 
        new ExtractTextPlugin(
            {filename: 'style.css'}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
          })
      ]
    //devtool: 'eval-sourcemap'
    
};
module.exports = (env,options) =>{
    let production = options.mode === 'production';
    conf.devtool = production  ? false : 'eval-sourcemap';
    return conf;   
    
    
};