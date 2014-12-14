var angular = require('angular');
var _       = require('lodash');

function addHeadersInterceptor(extraHeaders)  {
  return {
    beforeRequest: function (httpConfig, resourceConstructor, context) {
      _.extend(httpConfig.headers, extraHeaders);

      return httpConfig;
    }
  };
}

angular.module('goodsDbApp').factory('addHeadersInterceptor',
  ['extraHeaders', addHeadersInterceptor]
);
