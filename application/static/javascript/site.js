(function() {
  angular.module('app.controller', []).controller('PostsController', ['$scope', 'posts', function($scope, posts) {}]);

}).call(this);

(function() {
  angular.module('app', ['app.router']);

}).call(this);

(function() {
  angular.module('app.provider', []).provider('$app', function() {
    var $http, $injector;
    $injector = null;
    $http = null;
    this.setupProviders = function(injector) {

      /*
      Setup providers.
      @param injector: The $injector.
       */
      $injector = injector;
      return $http = $injector.get('$http');
    };
    this.store = {
      getPosts: (function(_this) {
        return function(index, size) {
          if (index == null) {
            index = 0;
          }
          if (size == null) {
            size = 20;
          }
          return $http({
            method: 'get',
            url: '/'
          });
        };
      })(this)
    };
    this.popMessage = {
      error: function(status) {

        /*
        pop error message.
         */
        switch (status) {
          case 400:
            return $.av.pop({
              title: 'Input Failed',
              message: 'Please check input values.',
              template: 'error'
            });
          case 403:
            return $.av.pop({
              title: 'Permission denied',
              message: 'Please check your permission.',
              template: 'error'
            });
          default:
            return $.av.pop({
              title: 'Error',
              message: 'Loading failed, please try again later.',
              template: 'error'
            });
        }
      }
    };
    this.$get = [
      '$injector', (function(_this) {
        return function($injector) {
          _this.setupProviders($injector);
          return {
            store: _this.store,
            popMessage: _this.popMessage
          };
        };
      })(this)
    ];
  });

}).call(this);

(function() {
  angular.module('app.router', ['app.provider', 'app.controller', 'ui.router']).config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
      return $stateProvider.state('index', {
        url: '/',
        resolve: {
          posts: [
            '$app', function($app) {
              return $app.store.getPosts();
            }
          ]
        },
        views: {
          content: {
            templateUrl: '/views/content/posts.html',
            controller: 'PostsController'
          }
        }
      });
    }
  ]);

}).call(this);
