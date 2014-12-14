var itemBrickController = function ($scope) {
  try {
    $scope.url = $scope.item.pictures[0].imageInfo.candidates[0].sites[0].url;
  } catch (e) {}
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
