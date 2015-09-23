app.controller("CalendarCtrl",
  function($scope) {

    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/");
    // console.log(ref);
    var authData = ref.getAuth();

    function checkAuthState(){
    // if already auth then load page
    if (authData) {
      runPage();
    // if not auth, then show login modal
    } else {
      // console.log("Logged out");
      $('#loginModal').removeClass("hidden");
        }
    }

  //when user submits login creds pass vals verify user info
  //and send message if incorrect or load page if correct
  $scope.logIn = function(email, password){
    console.log('logIn fired');
    ref.authWithPassword({
      "email": email,
      "password": password
    }, function(error, authData) {
      if (error) {
        alert('email or password was incorrect');
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $("#loginModal").addClass("hidden");
        runPage();
        }
      });
  };

  // this function will display calendar in DOM
  function runPage() {
    console.log("runPage fired");
    // this is the calendar to display
    $(document).ready(function() {
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      var events_array = [
        {
          title: 'All Day Event',
          start: new Date(2012, 7, 3)
        },
        {
          title: 'Long Event',
          start: new Date(2012, 7, 1)
        }];

    //  // call to slidebars
    //   $.slidebars({
    //     siteClose: true, // true or false
    //     disableOver: 480, // integer or false
    //     hideControlClasses: true, // true or false
    //     scrollLock: false // true or false
    //   });

    //   // page is now ready, initialize the calendar...

      $('#calendar').fullCalendar({
    //       // put your options and callbacks here

    //     // removes liscencing info for developers
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

    //     // creates the buttons in the calendar header
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
          left: 'prev,next today myCustomButton addEvent  ',
          center: 'title',
          right: 'month,agendaWeek,basicDay,agendaDay' //placing a space between these will seperate buttons
        },
          editable: true,
          events: events_array,
          // theme: true,
        dayClick: function(date, jsEvent, view) {
          d = date.format();
          $('#dater').text(d);
          $('#calendar').fullCalendar( 'gotoDate', d );
          $('#calendar').fullCalendar('changeView', 'agendaDay');
          $('#addEventModal').removeClass("hidden");
          addEvent(d);

        },
        // dayClick: function(date, allDay, jsEvent, view) {
        //   var $dialogContent = $("#event_edit_container");

        //   y = date.getFullYear();
        //   m = date.getMonth();
        //   d = date.getDate();

        //   h1 = date.getHours();
        //   m1 = date.getMinutes();

        //   h2 = h1 + 1;
        //   m2 = m1;

        //   calEvent = {
        //       title: 'New Calendar Event',
        //       editable: true,
        //       start: new Date(y, m, d, h1, m1),
        //       end: new Date(y, m, d, h2, m2),
        //       allDay: false
        //   };
        // }

      }); // closes .fullCalendar() / ends options area
    }); // closes .ready function()
  } // closes runPage()

  checkAuthState();
}); //closes lines 1-2