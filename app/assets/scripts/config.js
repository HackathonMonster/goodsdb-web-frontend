var angular = require('angular');

angular.module('goodsDbApp')
  .value('apiEndpoint', 'http://localhost:3000')
  .value('defaultExpiration', 300)
  .config(['FacebookProvider', function (FacebookProvider) {
    FacebookProvider.init({appId: '823996380993796', status: true});
  }])
  .value('facebookPermissions', 'email')
  .value('extraHeaders', {});
