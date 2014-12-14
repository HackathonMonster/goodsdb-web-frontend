var angular = require('angular');
var _       = require('lodash');

var userManagerProvider = function (BaseManager, Item) {

  function ItemManager() {
    BaseManager.call();
    this.cacheKey = 'items';
  }

  ItemManager.prototype = _.create(BaseManager.prototype, { constructor: ItemManager });

  _.extend(ItemManager.prototype, {
    index: function (query) {
      query = query || {};
      var key = this.getCacheKey(JSON.stringify(query));
      var fetch = _.bind(Item.query, Item, query);
      return this.getOrFetch(key, fetch, {cacheArray: true});
    }
  });

  return new ItemManager();
};

module.exports = angular.module('goodsDbApp').service(
  'itemManager', ['BaseManager', 'Item', userManagerProvider]
);
