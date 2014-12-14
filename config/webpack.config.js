var path = require('path');

var root = path.dirname(__dirname);

module.exports = {
  context: root,

  resolve: {
    alias: {
      angular: path.join(root, 'app', 'assets', 'scripts', 'shims', 'angular'),
      lodash: path.join(root, '.components', 'lodash', 'dist', 'lodash'),
      moment: path.join(root, '.components', 'moment', 'moment.js'),
      jquery: path.join(root, '.components', 'jquery', 'dist', 'jquery.js')
    }
  },

  entry: path.join(root, 'app', 'assets', 'scripts', 'entry.js'),
  output: {
    path: path.join(root, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.jade$/, loader: 'jade' }
    ]
  },

  node: {
    fs: 'empty'
  },

  plugins: []
};
