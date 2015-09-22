var app = angular.module("familyCalendar", ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/cal.html',
        controller: 'CalendarCtrl'
      }).otherwise ({
        redirectTo: '/'
      });
}]);