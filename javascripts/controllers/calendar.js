app.controller("CalendarCtrl",
  function($scope) {

  
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
            text: 'Shopping List!',
            click: function() {
              alert('clicked the custom button!');
            }
          }
        },
        header: {
          left: 'prev,next today myCustomButton',
          center: 'title',
          right: 'month,agendaWeek,basicDay,agendaDay' //placing a space between will seperate buttons
        }
      })

    }); //closes line 5
  
}); //closes lines 1-2
