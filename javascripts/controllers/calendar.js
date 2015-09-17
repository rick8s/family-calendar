app.controller("CalendarCtrl",
  function($scope) {
 
    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/");
    var authData = ref.getAuth();

    if (authData) {
      runPage();
      console.log("Logged in as:", authData.uid);

    } else {
      console.log("Logged out");
      $('#loginModal').removeClass("hidden");

      }

    $(document).on("click", "#signIn", function(){
      email = $('#emailInput').val();
      console.log(email);
      password = $('#pswdInput').val();
      console.log(password);
      $("#loginModal").addClass("hidden");
      logIn(email, password);

    });

  function logIn(email, password) {
    ref.authWithPassword({
      "email": email,
      "password": password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        runPage();
      }
    });
    }
  
  function runPage() {
    // This is the calendar to display
    $(document).ready(function() {

      // page is now ready, initialize the calendar...

      $('#calendar').fullCalendar({
          // put your options and callbacks here
        // removes liscencing info for developers  
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

        // creates the buttons in the calendar header
        customButtons: {
          myCustomButton: {
            text: 'Log out of Firebase!',
            click: function() {

              alert('you logged out!');
              ref.unauth(); // this will log you off firebase authentication for now
            }
          }
        },
        header: {
          left: 'prev,next today myCustomButton',
          center: 'title',
          right: 'month,agendaWeek,basicDay,agendaDay' //placing a space between these will seperate buttons
        }






      }); // closes .fullCalendar() / ends options area
    }); // closes .ready function() 
  } // closes runPage()
}); //closes lines 1-2
