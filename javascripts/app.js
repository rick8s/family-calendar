var app = angular.module("familyCalendar", ['ngRoute', 'firebase']);

// $(document).ready(function() {
//   $.slidebars();
// });

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/cal.html',
        controller: 'CalendarCtrl'
      }).
      when('/todo', {
        templateUrl: 'partials/todos.html',
        controller: 'TodoCtrl'
      }).
      when('/shop', {
        templateUrl: 'partials/shop.html',
        controller: 'ShopCtrl'
      }).
      otherwise ({
        redirectTo: '/'
      });
}]);