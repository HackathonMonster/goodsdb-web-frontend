var needSignin = function ($rootScope) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      function toggleElementActive() {
        if ($rootScope.signedIn()) {
          var disabled = element.attr('ng-disabled');
          if (!(disabled && scope.$eval(disabled))) {
            element.removeAttr('disabled');
          }
          element.removeAttr('title');
        } else {
          element.attr('disabled', 'disabled');
          element.attr('title', 'ログインしてくさい');
        }
      }

      function toggleElementDisplay() {
        if ($rootScope.signedIn()) {
          element.show();
        } else {
          element.hide();
        }
      }

      $rootScope.$watch('currentUser', function () {
        if (element.attr('need-signin') === 'hide') {
          toggleElementDisplay();
        } else {
          toggleElementActive();
        }
      });
    }
  };
};

angular.module('goodsDbApp').directive('needSignin', [
  '$rootScope', needSignin
]);
