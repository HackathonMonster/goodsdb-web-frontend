var _       = require('lodash');
var angular = require('angular');

var app = angular.module('goodsDbApp', [
  'rails',
  'ui.router',
  'facebook',
  'wu.masonry',
  'LocalStorageModule'
]);

require('./config');
require('./bootstrap');
require('./models');
require('./managers');
require('./directives');
require('./controllers');
require('./router');
