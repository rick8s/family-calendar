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
      otherwise ({
        redirectTo: '/'
      });
}]);