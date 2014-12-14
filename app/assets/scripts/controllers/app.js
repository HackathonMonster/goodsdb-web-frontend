function AppCtrl($scope, $state, userManager) {
  $scope.search = '';
  $scope.previousSearch = '';

  $scope.filter = function ($event, text) {
    if ($event.target && $event.target.search) {
      $event.target.search.blur();
    }
    $scope.$broadcast('filter', _.isUndefined(text) ? $scope.search : text);
  };

  $scope.$on('filter', function (e, tag) {
    $scope.search = tag;
    $scope.previousSearch = $scope.search;
  });

  $scope.clear = function () {
    $scope.search = '';
  };

  $scope.restore = function () {
    if ($scope.search === '') {
      $scope.search = $scope.previousSearch;
    }
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
