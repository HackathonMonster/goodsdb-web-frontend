function DashboardTopCtrl($scope, items, itemManager) {
  $scope.items = items;

  $scope.$on('filter', function (e, word) {
    itemManager.search({'tags[]': word.split(' '), type: 'any'}).then(function (items) {
      $scope.items = items;
    });
  });
}

angular.module('goodsDbApp').controller('DashboardTopCtrl', [
  '$scope', 'items', 'itemManager', DashboardTopCtrl
]);
