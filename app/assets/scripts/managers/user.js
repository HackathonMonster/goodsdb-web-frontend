var angular = require('angular');
var _       = require('lodash');

var userManagerProvider = function ($q, localStorageService,
  Facebook, BaseManager, User, resourceCacheManager, facebookPermissions) {

  function UserManager() {
    BaseManager.call();
    this.cacheKey = 'users';
  }

  UserManager.prototype = _.create(BaseManager.prototype, { constructor: UserManager });

  _.extend(UserManager.prototype, {
    get: function (id) {
      return this.getOrFetch(this.getCacheKey(id), _.bind(User.get, User, id));
    },

    facebookLogin: function () {
      var deferred = $q.defer();
      Facebook.getLoginStatus(_.bind(function (response) {
        if (response.status === 'connected') {
          this._loginCurrent(response.authResponse, deferred);
        } else {
          this._makeFacebokLogin(deferred);
        }
      }, this), function (r) { console.error(r); });
      return deferred.promise;
    },

    _makeFacebokLogin: function (deferred) {
      Facebook.login(_.bind(function (response) {
        if (response.status === 'connected') {
          this._loginCurrent(response.authResponse, deferred);
        } else {
          deferred.reject(response);
        }
      }, this), {scope: facebookPermissions});
    },

    _loginCurrent: function (loginInfo, deferred) {
      User.login({
        facebook_id: loginInfo.userID,
        facebook_token: loginInfo.accessToken
      }).then(function (response) {
        var user = new User(response.data);
        localStorageService.set('token', user.token);
        deferred.resolve(user);
      }, deferred.reject);
    },

    fetchCurrent: function () {
      var deferred = $q.defer();
      User.get('current').then(function (user) {
        user = user || new User();
        deferred.resolve(user);
      }, deferred.reject);
      return deferred.promise;
    },

    logout: function () {
      localStorageService.remove('token');
    }
  });

  return new UserManager();
};

module.exports = angular.module('goodsDbApp').service(
  'userManager', ['$q', 'localStorageService', 'Facebook', 'BaseManager',
                  'User', 'resourceCacheManager', 'facebookPermissions',
                  userManagerProvider]
);
