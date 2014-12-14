function AppCtrl($scope, $state, userManager) {
  $scope.logout = function () {
    userManager.logout();
    $scope.setCurrentUser(null);
    $state.go('signin');
  };
}

angular.module('goodsDbApp').controller('AppCtrl', [
  '$scope', '$state', 'userManager', AppCtrl
]);
