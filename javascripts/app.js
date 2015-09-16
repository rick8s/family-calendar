var app = angular.module("familyCalendar", ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/cal.html',
        controller: 'CalendarCtrl'
      // }).
      // when ('/', {
      //   templateUrl: 'partials/add-pin-form.html',
      //   controller: 'addPinCtrl'
      // }).when ('/personal', {
      //   templateUrl: 'partials/personal.html',
      //   controller: 'PersonalCtrl'
      }).otherwise ({
        redirectTo: '/'
      });
}]);