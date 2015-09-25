app.controller("CalendarCtrl", 
  function($scope) {
 
    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/");
    var authData;
    var uid;


    // if already auth then load page
    if (authData) {
      runPage(); 
      console.log("Logged in as:", authData.uid);
    // if not auth, then show login modal 
    } else {
      console.log("Logged out");
      $('#loginModal').removeClass("hidden");

      }
    //when user submits login creds pass vals to login function
    $(document).on("click", "#signIn", function(){
      email = $('#emailInput').val();
      console.log(email);
      password = $('#pswdInput').val();
      console.log(password);
      $("#loginModal").addClass("hidden");
      logIn(email, password);

    });
  // verify user info and send message if incorrect or load page if correct
  function logIn(email, password) {
    ref.authWithPassword({
      "email": email,
      "password": password
    }, function(error, authData) {
      if (error) {
        alert('email or password was incorrect');
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        authData = ref.getAuth();
        console.log(authData);
        uid = ref.getAuth().uid;
        console.log(uid);
        runPage();
      }
    });
  }


  // this function will display calendar in DOM
  function runPage() {
    // this is the calendar to display
    $(document).ready(function() {
      console.log("runPage fired");
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

     // call to slidebars
      $.slidebars({
        siteClose: true, // true or false
        disableOver: 480, // integer or false
        hideControlClasses: true, // true or false
        scrollLock: false // true or false
      });

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
    //     dayClick: function(date, allDay, jsEvent, view) {
    // var $dialogContent = $("#event_edit_container");

    // y = date.getFullYear();
    // m = date.getMonth();
    // d = date.getDate();

    // h1 = date.getHours();
    // m1 = date.getMinutes();

    // h2 = h1 + 1;
    // m2 = m1;

    // calEvent = {
    //     title: 'New Calendar Event',
    //     editable: true,
    //     start: new Date(y, m, d, h1, m1),
    //     end: new Date(y, m, d, h2, m2),
    //     allDay: false
    // };
    //     }

          

        
      }); // closes .fullCalendar() / ends options area
    
          console.log("Calendar initiated");

    }); // closes .ready function() 
  } // closes runPage()

  // get info from new event form and send it to firebase
  function addEvent(d) {

    // add clock for picking times
    $('.clockpicker').clockpicker({
    placement: 'top',
    align: 'left',
    autoclose: true,
    // donetext: 'Done'
    }); 

    $("#addEvent").click(function(e){
      e.preventDefault();
      // retrieve object from checkboxes
      var who = $scope.checkboxModel;
      // retrieve object values
      var whoItBe = [];

      angular.forEach(who, function(value, key) {
      this.push(value);
      }, whoItBe);
    
     
      var newEvent = {
        uid: uid,
        date: d,
        title: $("#eTitle").val(),
        where: $("#eLoc").val(),
        who: whoItBe,
        from: $("#eStart").val(),
        to: $("#eStop").val()
      }; 
      $('#calendar').fullCalendar( 'renderEvent', newEvent , 'stick');
      // clear the form
      $('#addEventModal').find('input:text, input:password, select, textarea').val('');
      $('#addEventModal').find('input:radio, input:checkbox').prop('checked', false);
      // hide the modal
      $("#addEventModal").addClass("hidden");

      console.log("newEvent", newEvent);
      console.log("uid: ", uid);
   
      $.ajax({
        url: "https://8sfamily-calendar.firebaseio.com/events.json",
        method: "POST",
        data: JSON.stringify(newEvent)
      }).done(function(newData){


      }).fail(function(xhr, status, error){

      });
      console.log("new event", newEvent);
    }); //closes add new event - 152

  } // closes line add event - 142
  
  // $scope.events = $firebaseArray(ref.child('events'));
  
  // console.log("events", events);

  


  $('#calendar').fullCalendar({
            editable: true
  });

  $(document).on("click", "#cancel", function(){
    // clear the form
    $('#addEventModal').find('input:text, input:password, select, textarea').val('');
    $('#addEventModal').find('input:radio, input:checkbox').prop('checked', false);
    // hide the modal
    $("#addEventModal").addClass("hidden");

  });

  // can select All or multiple individuals, but not both
  $(".person").on('change', function(){ console.log(this);
    $('#allIn').not(this).prop('checked', false);
  });
  $("#allIn").on('change', function(){ console.log(this);
    $('.person').not(this).prop('checked', false);
  });



    
  
}); //closes lines 1-2

// $(function() {   
//       $scope.events = [[]];
//       $( "#datepicker" ).datepicker();   
//      });     
//       $scope.addEvent = function(){
//       var baseRef = new Firebase("https://testcap.firebaseio.com/users");
//       var authInfo = baseRef.getAuth();
//       var fbId = authInfo.uid;
//       $scope.events[0].push($scope.newEvent);
//       var showsRef = new Firebase("https://testcap.firebaseio.com/shows/");
//       $scope.newEvent.uid = fbId;
//       showsRef.push($scope.newEvent);
//     $scope.events = $firebaseArray(showsRef);
//     };
