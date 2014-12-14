function AppCtrl($scope, $state, userManager) {
  $scope.previousSearch = '';
  $scope.query = {type: 'any'};

  $scope.filter = function ($event, text) {
    if ($event && $event.target && $event.target.search) {
      $event.target.search.blur();
    }
    $scope.query.tags = _.isUndefined(text) ? $scope.query.tags : text;
    $scope.$broadcast('filter', $scope.query);
  };

  $scope.$on('filter', function (e, query) {
    $scope.query.tags = query.tags;
    $scope.previousSearch = $scope.search;
  });

  $scope.clear = function () {
    $scope.query.tags = '';
  };

  $scope.restore = function () {
    if ($scope.query.tags === '') {
      $scope.query.tags = $scope.previousSearch;
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
