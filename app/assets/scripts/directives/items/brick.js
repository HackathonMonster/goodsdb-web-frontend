var itemBrickController = function ($scope) {
  $scope.filter = function (tag) {
    $scope.$emit('filter', {tags: tag});
  };
};

var itemBrick = function () {
  return {
    restrict: 'A',
    scope: {
      item: '=itemBrick'
    },
    template: require('../../templates/items/brick.jade'),
    controller: ['$scope', itemBrickController]
  };
};

angular.module('goodsDbApp').directive('itemBrick', [
  itemBrick
]);
