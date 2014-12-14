var angular = require('angular');
var _       = require('lodash');
var moment  = require('moment');

var resourceCacheManager = function (defaultExpiration) {
  var cachedItems = {};
  function ResourceCacheManager() {
  }

  _.extend(ResourceCacheManager.prototype, {
    get: function (key) {
      var cached = cachedItems[key];
      if (cached) {
        if (moment().isBefore(cached.expiresAt)) {
          return cached.value;
        }
        delete cached.value;
      }
      return null;
    },

    cache: function (key, value, expiresIn) {
      expiresIn = expiresIn || defaultExpiration;
      cachedItems[key] = {
        expiresAt: moment().add(expiresIn, 'seconds'),
        value: value
      };
      return value;
    },

    cacheArray: function (baseKey, array, expiresIn) {
      _.each(array, _.bind(function (value) {
        if (!value.id) {
          return;
        }
        var key = baseKey + '.' + value.id;
        this.cache(key, value, expiresIn);
      }, this));
    }
  });

  return new ResourceCacheManager();
};

module.exports = angular.module('goodsDbApp').service(
  'resourceCacheManager', ['defaultExpiration', resourceCacheManager]
);
