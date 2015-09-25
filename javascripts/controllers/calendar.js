app.controller("CalendarCtrl", ["$scope", "$http", "$firebaseObject",
  function($scope, $http, $firebaseObject) {

    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/");
    // console.log(ref);
    var authData = ref.getAuth();
    var uid;
    

    

    function checkAuthState(){
    // if already auth then load page
    if (authData) {
       getData(); 
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
          uid = ref.getAuth().uid;
          getData(); 
          }
        });
    }; // closes logIn function

    var getData = function(){
      $http.get('https://8sfamily-calendar.firebaseio.com/.json').success(function(data) {
        $scope.events = data;
        loadCalendar();
        populateCalendar(data);
      });
    };

    var loadCalendar = function(){
     console.log("fired");
      $('#calendar').fullCalendar({

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
        dayClick: function(date, jsEvent, view) {
            d = date.format();
            $('#dater').text(d);
            $('#calendar').fullCalendar( 'gotoDate', d );
            $('#calendar').fullCalendar('changeView', 'agendaDay');
            $('#addEventModal').removeClass("hidden");
            addEvent(d);
          }

      //       // put your options and callbacks here

        }); // closes .fullCalendar() / ends options area

    }; //closes loadCal

    var populateCalendar = function(fb){
      $scope.data = fb;
      var events = $scope.data.events;
      var done = [];

      console.log("scope", $scope.data);
      console.log("events", events);
      for (var key in events) {
        done.push(events[key]);
      } console.log("done", done);
      for (var i = 0; i<done.length; i++) {
        console.log("3", done[i].date);
        $('#calendar').fullCalendar('renderEvent', {
          title: done[i].title,
          start: new Date(done[i].date + ' ' + done[i].from)
        });
      }
    };

// put addEvents back in

// make modals pop

// add click events to control modals







    checkAuthState();

}]);







          //     // removes liscencing info for developers
      // schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      //     // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

      // //     // creates the buttons in the calendar header
      //     customButtons: {
      //       myCustomButton: {
      //         text: 'Log out of Firebase!',
      //         click: function() {

      //           alert('you logged out!');
      //           ref.unauth(); // this will log you off firebase authentication for now
      //         }
      //       }
      //     },
      //     header: {
      //       left: 'prev,next today myCustomButton addEvent  ',
      //       center: 'title',
      //       right: 'month,agendaWeek,basicDay,agendaDay' //placing a space between these will seperate buttons
      //     },
      //     editable: true,
      //     // events: ,
      //     // theme: true,

      //     // events: ,
      //   //   [
      //   //     {
      //   //       title: 'My Event',
      //   //       start: '2015-09-24',
      //   //       description: 'This is a cool event'
      //   //     }
      //   // // more events here
      //   //   ],

      //     dayClick: function(date, jsEvent, view) {
      //       d = date.format();
      //       $('#dater').text(d);
      //       $('#calendar').fullCalendar( 'gotoDate', d );
      //       $('#calendar').fullCalendar('changeView', 'agendaDay');
      //       $('#addEventModal').removeClass("hidden");
      //       addEvent(d);
      //     },

          // allow event to be edited 
          // eventClick: function(event){           
          //   //apply(function(){
          //     alert(event.title + ' is clicked');
          //   //});
          // }







//     $scope.eventSource = {
//             url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
//             className: 'gcal-event',           // an option!
//             currentTimezone: 'America/Chicago' // an option!
//     };



//     // this function will display calendar in DOM
//     $scope.runPage = function(){
//       cnsole.log("fired");
     
//       // this is the calendar to display
//       $(document).ready(function() {
//         var date = new Date();
//         var d = date.getDate();
//         var m = date.getMonth();
//         var y = date.getFullYear();
//         var currentView = "month";
     


        
          
          
//           // for (var i = 0; i < data.length; i++)
//           // {
//           //     $scope.events[i] = {uid: data[i].uid,date: data[i].date,title: data[i].title,start: new Date(data[i].from), end: new Date(data[i].to),who: data[i].who,allDay: false};
//           //     // events_array.push($scope.events);
             
//           // } 
          
        

//         // $http.get('DataRetriever.jsp').success(function(data) {
//         //   for(var i = 0; i < data.length; i++)
//         //   {
//         //       $scope.events[i] = {id:data[i].id, title: data[i].task,start: new Date(data[i].start), end: new Date(data[i].end),allDay: false};
//         //   }
//         //  });

      
//       //  // call to slidebars
//       //   $.slidebars({
//       //     siteClose: true, // true or false
//       //     disableOver: 480, // integer or false
//       //     hideControlClasses: true, // true or false
//       //     scrollLock: false // true or false
//       //   });

//       //   // page is now ready, initialize the calendar...
// console.log("obj", events_object);
        
//     }); // closes .ready function()
//   }; // closes runPage()

//       // get info from new event form and send it to firebase
//       function addEvent(d) {

//         // add clock for picking times
//         $('.clockpicker').clockpicker({
//         placement: 'top',
//         align: 'left',
//         autoclose: true,
//         // donetext: 'Done'
//         }); 

//         $("#addEvent").click(function(e){
//           e.preventDefault();
//           // retrieve object from checkboxes
//           var who = $scope.checkboxModel;
//           // retrieve object values
//           var whoItBe = [];

//           angular.forEach(who, function(value, key) {
//           this.push(value);
//           }, whoItBe);
        
         
//           var newEvent = {
//             uid: uid,
//             date: d,
//             title: $("#eTitle").val(),
//             where: $("#eLoc").val(),
//             who: whoItBe,
//             from: $("#eStart").val(),
//             to: $("#eStop").val()
//           }; 
//           $('#calendar').fullCalendar( 'renderEvent', newEvent , 'stick' );
//           // clear the form
//           $('#addEventModal').find('input:text, input:password, select, textarea').val('');
//           $('#addEventModal').find('input:radio, input:checkbox').prop('checked', false);
//           // hide the modal
//           $("#addEventModal").addClass("hidden");

//           console.log("newEvent", newEvent);
//           console.log("uid: ", uid);
       
//           $.ajax({
//             url: "https://8sfamily-calendar.firebaseio.com/events.json",
//             method: "POST",
//             data: JSON.stringify(newEvent)
//           }).done(function(newData){


//           }).fail(function(xhr, status, error){

//           });
//           console.log("new event", newEvent);
//         }); //closes addEvent click function 

//       } // closes addEvent()


  

//   $('#calendar').fullCalendar({
//             editable: true
//   });

//   $(document).on("click", "#cancel", function(){
//     // clear the form
//     $('#addEventModal').find('input:text, input:password, select, textarea').val('');
//     $('#addEventModal').find('input:radio, input:checkbox').prop('checked', false);
//     // hide the modal
//     $("#addEventModal").addClass("hidden");

//   });

//   // can select All or multiple individuals, but not both
//   $(".person").on('change', function(){ console.log(this);
//     $('#allIn').not(this).prop('checked', false);
//   });
//   $("#allIn").on('change', function(){ console.log(this);
//     $('.person').not(this).prop('checked', false);
//   });
//   checkAuthState();
// }); //closes lines 1-2


