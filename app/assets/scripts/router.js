var angular   = require('angular');
var _         = require('lodash');

var router = function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  require('./routes/dashboard')($stateProvider);
  require('./routes/authentication')($stateProvider);
};

angular.module('goodsDbApp').config(
  ['$stateProvider', '$urlRouterProvider', router]
);

angular.module('goodsDbApp').run(['$rootScope', function ($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.log(error.stack);
  });
}]);
