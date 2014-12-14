var angular = require('angular');
var _       = require('lodash');

var baseManagerProvider = function ($q, resourceCacheManager) {
  function BaseManager() {
    this.cacheKey = 'base';
  }

  _.extend(BaseManager.prototype, {
    save: function (resource) {
      var deferred = $q.defer();
      resource.save().then(_.bind(function () {
        resourceCacheManager.cache(this.getCacheKey(resource.id), resource);
        deferred.resolve(resource);
      }, this), deferred.reject);
      return deferred.promise;
    },

    getCacheKey: function () {
      args = Array.prototype.slice.call(arguments);
      args.unshift(this.cacheKey);
      return args.join('.');
    },

    getFromCache: function (key, onNotFound) {
      var deferred = $q.defer();
      var resource = resourceCacheManager.get(key);
      if (resource) {
        deferred.resolve(resource);
      } else {
        onNotFound(deferred);
      }
      return deferred.promise;
    },

    fetchAndCache: function (key, fetch, deferred, options) {
      options = options || {};
      fetch().then(_.bind(function (resource) {
        this._finishDeserializeAll(resource);
        resourceCacheManager.cache(key, resource);
        if (options.cache) {
          options.cache(resource);
        }
        if (options.cacheArray && _.isArray(resource)) {
          resourceCacheManager.cacheArray(this.cacheKey, resource);
        }
        deferred.resolve(resource);
      }, this), deferred.reject);
    },

    _finishDeserializeAll: function (resource) {
      if (!_.isArray(resource)) {
        resource = [resource];
      }
      _.each(resource, _.bind(this.finishDeserialize, this));
    },

    finishDeserialize: function (resource) {
    },

    getOrFetch: function (key, fetch, options) {
      return this.getFromCache(key, _.bind(function (deferred) {
        this.fetchAndCache(key, fetch, deferred, options);
      }, this));
    }
  });

  return BaseManager;
};

module.exports = angular.module('goodsDbApp').factory(
  'BaseManager', ['$q', 'resourceCacheManager', baseManagerProvider]
);
