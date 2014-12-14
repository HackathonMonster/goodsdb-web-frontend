var loginButtonCtrl = function ($scope, $rootScope, $state, userManager) {
  $scope.login = function () {
    userManager.facebookLogin().then(function (user) {
      $rootScope.setCurrentUser(user);
      $state.go('dashboard.top');
    });
  };
};

var loginButton = function () {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      user: '=user'
    },
    controller: ['$scope', '$rootScope', '$state', 'userManager', loginButtonCtrl],
    template: require('../../templates/users/login-button.jade')
  };
};

angular.module('goodsDbApp').directive('loginButton', [
  loginButton
]);
