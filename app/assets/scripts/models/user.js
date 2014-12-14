var angular = require('angular');
var _       = require('lodash');

var userProvider = function (RailsResource, $http, addHeadersInterceptor, apiEndpoint) {
  function User() {
    User.__super__.constructor.apply(this, arguments);
  }

  RailsResource.extendTo(User);
  User.configure({
    url: apiEndpoint + '/users',
    name: 'user',
    interceptors: [addHeadersInterceptor]
  });

  _.extend(User, {
    current: null,

    login: function (params) {
      var url = apiEndpoint + '/login';
      return $http.post(url, params);
    }
  });

  _.extend(User.prototype, {

  });

  return User;
};

module.exports = angular.module('goodsDbApp').factory('User', [
  'RailsResource', '$http', 'addHeadersInterceptor', 'apiEndpoint', userProvider
]);
