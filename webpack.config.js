/* const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
}; */

// module.exports = {
//     mode: "development",
  
//     devServer: {
//       static: "./dist",
//     },
// };

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
//   entry: './src/main.js',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'main.js',
//   },
//   plugins: [new HtmlWebpackPlugin()],
// };

const path = require('path');

module.exports = {
  //...
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
