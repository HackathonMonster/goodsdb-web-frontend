var itemBrick = function () {
  return {
    restrict: 'A',
    scope: {
      item: '=itemBrick'
    },
    template: require('../../templates/items/brick.jade')
  };
};

angular.module('goodsDbApp').directive('itemBrick', [
  itemBrick
]);
