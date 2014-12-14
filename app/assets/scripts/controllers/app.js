function AppCtrl($scope, $state, userManager) {
  $scope.search = '';

  $scope.filter = function () {
    $scope.$broadcast('filter', $scope.search);
    $scope.search = '';
  };

  $scope.logout = function () {
    userManager.logout();
    $scope.setCurrentUser(null);
    $state.go('signin');
  };
}

angular.module('goodsDbApp').controller('AppCtrl', [
  '$scope', '$state', 'userManager', AppCtrl
]);
