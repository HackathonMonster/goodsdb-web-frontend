function SigninCtrl($scope, $state) {
  if ($scope.currentUser) {
    $state.go('dashboard.top');
  }
}

angular.module('goodsDbApp').controller('SigninCtrl', [
  '$scope', '$state', SigninCtrl
]);
