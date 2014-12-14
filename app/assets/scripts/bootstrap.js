var _       = require('lodash');
var angular = require('angular');

function bootstrap($rootScope, $state, userManager, localStorageService, extraHeaders) {
  var token = localStorageService.get('token');
  if (token) {
    extraHeaders['X-Token'] = token;
  }

  $rootScope.setCurrentUser = function (user) {
    $rootScope.currentUser = user;
    if (user) {
      extraHeaders['X-Token'] = user.token;
    } else {
      delete extraHeaders['X-Token'];
    }
  };

  $rootScope.signedIn = function () {
    return $rootScope.currentUser;
  };

  $rootScope.$state = $state;

  userManager.fetchCurrent().then(function (user) {
    $rootScope.setCurrentUser(user);
    $state.go('dashboard.top');
  });

  // TODO: move to service
  $.material.init();
}

angular.module('goodsDbApp').run([
  '$rootScope', '$state', 'userManager', 'localStorageService', 'extraHeaders', bootstrap
]);
