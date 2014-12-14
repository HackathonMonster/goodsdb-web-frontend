module.exports = function ($stateProvider) {
  $stateProvider
    .state('signin', {
      url: '/signin',
      template: require('../templates/auth/signin.jade'),
      controller: 'SigninCtrl'
    });
};
