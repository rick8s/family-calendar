define(["jquery", "firebase", "bootstrap", "hbs", "moment", "fullcalendar", "scheduler"], 
  function($, _firebase, bootstrap, Handlebars, moment, fullcalendar, scheduler) {

    $(document).ready(function() {

      // page is now ready, initialize the calendar...

      $('#calendar').fullCalendar({
          // put your options and callbacks here
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',

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

    }); //closes line 4



}); //closes line 1-2

