var confirmClick = function ($window) {
  return {
    restrict: 'A',
    priority: -1,
    link: function (scope, element, attrs) {
      element.bind('click', function(e) {
        var message = attrs.confirmClick;
        if(message && !$window.confirm(message)){
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      });
    }
  };
};

angular.module('goodsDbApp').directive('confirmClick', [
  '$window', confirmClick
]);
