app.controller("EventCtrl", ['$scope', 'firebase',
  function($scope, _firebase) {
 
    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/");
  
      // get info from new event form and send it to firebase
      $scope.addEvent = function(d) {

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
          // $('#calendar').fullCalendar( 'renderEvent', newEvent , 'stick' );
          // clear the form
          $('#addEventModal').find('input:text, input:password, select, textarea').val('');
          $('#addEventModal').find('input:radio, input:checkbox').prop('checked', false);
          // hide the modal
          $("#addEventModal").addClass("hidden");

          console.log("newEvent", newEvent);
          console.log("uid: ", uid);
       
          }).done(function(newData){
          $.ajax({
            url: "https://8sfamily-calendar.firebaseio.com/events.json",
            method: "POST",
            data: JSON.stringify(newEvent)


          }).fail(function(xhr, status, error){

          });
          console.log("new event", newEvent);
        }); //closes addEvent click function 

      }; // closes addEvent()

    // cancel addEvent action and exit form
    $scope.cancel =  function(){
      $('#addEventModal').find('input:text, input:password, select, textarea').val('');
      $('#addEventModal').find('input:radio, input:checkbox').prop('checked', false);
      // hide the modal
      $("#addEventModal").addClass("hidden");
    };

    // enable selection of All or multiple individuals, but not both for an event
    $(".person").on('change', function(){ console.log(this);
      $('#allIn').not(this).prop('checked', false);
    });
    $("#allIn").on('change', function(){ 
      $('.person').not(this).prop('checked', false);
    });
  
}]);
