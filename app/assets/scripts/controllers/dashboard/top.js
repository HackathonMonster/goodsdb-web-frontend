function DashboardTopCtrl($scope, items) {
  $scope.items = items;
}

angular.module('goodsDbApp').controller('DashboardTopCtrl', [
  '$scope', 'items', DashboardTopCtrl
]);
