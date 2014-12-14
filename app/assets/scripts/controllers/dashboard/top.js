function DashboardTopCtrl($scope, items, itemManager) {
  $scope.items = items;

  $scope.$on('filter', function (e, query) {
    query.tags = query.tags || '';
    query.tags = query.tags.split(' ');
    query.type = query.type || 'any';
    itemManager.search(query).then(function (items) {
      $scope.items = items;
    });
  });
}

angular.module('goodsDbApp').controller('DashboardTopCtrl', [
  '$scope', 'items', 'itemManager', DashboardTopCtrl
]);
