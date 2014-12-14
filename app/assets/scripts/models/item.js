var angular = require('angular');
var _       = require('lodash');

var itemProvider = function (RailsResource, addHeadersInterceptor, apiEndpoint) {
  function Item() {
    Item.__super__.constructor.apply(this, arguments);
  }

  RailsResource.extendTo(Item);
  Item.configure({
    url: apiEndpoint + '/items',
    name: 'item',
    interceptors: [addHeadersInterceptor]
  });


  return Item;
};

module.exports = angular.module('goodsDbApp').factory('Item', [
  'RailsResource', 'addHeadersInterceptor', 'apiEndpoint', itemProvider
]);
