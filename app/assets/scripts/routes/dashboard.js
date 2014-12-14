module.exports = function ($stateProvider) {
  $stateProvider
  .state('dashboard', {
    abstract: true,
    url: '/',
    template: require('../templates/index.jade'),
    resolve: {
      company: ['$q', '$rootScope', '$state', 'userManager', function ($q, $rootScope, $state, userManager) {
        if ($rootScope.currentUser) {
          return $rootScope.currentUser;
        }
        var deferred = $q.defer();
        userManager.fetchCurrent().then(function (user) {
          deferred.resolve($rootScope.setCurrentUser(user));
        }, function () {
          deferred.reject(null);
          $state.go('signin');
        });
        return deferred.promise;
      }]
    }
  })
  .state('dashboard.top', {
    url: '',
    controller: 'DashboardTopCtrl',
    template: require('../templates/dashboard/top.jade')
  });
};
