app.controller("AddEventCtrl", ['jquery'],
  function($, $scope) {
 
    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/");
  
  $("#addEvent").click(function(e){
    e.preventDefault();
    var newEvent = {
      date: d,
      title: $("#eTitle").val(),
      where: $("#eLoc").val(),
      who: $("selected:checkbox").val(),
      from: $("#eStart").val(),
      to: $("#eStop").val()
    };
    console.log("newEvent", newEvent);
 
    $.ajax({
      url: "https://8sfamily-calendar.firebaseio.com/events.json",
      method: "POST",
      data: JSON.stringify(newEvent)
    }).done(function(newData){

    }).fail(function(xhr, status, error){

    });
    console.log("new event", newEvent);
  });
  
   // add clock for picking times
  $('.clockpicker').clockpicker({
  placement: 'top',
  align: 'left',
  donetext: 'Done'
  }); 
  
});
