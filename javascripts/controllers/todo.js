app.controller("TodoCtrl", ["$scope", "$http", "$firebaseObject", "$location", 
  function($scope, $http, $firebaseObject, $location) {
    $scope.page = "Task List";
    $scope.tasks = [];

    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/tasks");
    var tasks = $firebaseObject(ref); 
    var uid = ref.getAuth().uid;
    tasks.$bindTo($scope, "tasks");
     
    // move from ToDo to Done
    $scope.moveTask = function(key, task) {
    ref.child(key).child('finished').set(true);
    }; 

    // remove task from firebase
    $scope.removeTask = function(key, task) {
      delete $scope.tasks[key];
    };
 
  // create and add a new task to the firebase
  $scope.addTask = function() {
    var who = $scope.checkboxModel;
    // retrieve object values
    var whoseIsIt = [];
    
    // loop over checkboxes to see who was assigned the task
    angular.forEach(who, function(value, key) {
      if (who[key] !== false) {
        this.push(value);
      }
    }, whoseIsIt); 
    
    var newTask = {
      // uid: uid,
      title: $("#tTitle").val(),
      who: whoseIsIt,
      finished: false,
    }; // console.log("newTask", newTask);


    $.ajax({
      url: "https://8sfamily-calendar.firebaseio.com/tasks.json",
      method: "POST",
      data: JSON.stringify(newTask)
    }).done(function(){

    }).fail(function(xhr, status, error){

    });

    // clear fields after storing task to firebase
    $('#taskInput').find('input:text, input:password, select, textarea').val('');
    $('#allIn').not(this).prop('checked', false);
    $('.person').not(this).prop('checked', false);
    

  }; //closes $scope.addTask 
   

  // enable selection of All or multiple individuals, but not both for an event
  $(".person").on('change', function(){ 
    $('#allIn').not(this).prop('checked', false);
  });
  $("#allIn").on('change', function(){ 
    $('.person').not(this).prop('checked', false);
  });

  // set value of All to false when individuals are checked
  $scope.updateOne = function() {
    $scope.checkboxModel.all = false;
  }; //closes updateOne function

  // set the value of each individual to false if ALL is selected  
  $scope.updateAll = function() {
    $scope.checkboxModel.rick = false;
    $scope.checkboxModel.susan = false;
    $scope.checkboxModel.neal = false;
    $scope.checkboxModel.sydney = false;
  }; //closes updateAll function

  // clear everything if task input is started but canceled
  $scope.cancelTask = function() {
    $('#taskInput').find('input:text, input:password, select, textarea').val('');
    $('#allIn').not(this).prop('checked', false);
    $('.person').not(this).prop('checked', false);
    $scope.checkboxModel.all = false;
    $scope.checkboxModel.rick = false;
    $scope.checkboxModel.susan = false;
    $scope.checkboxModel.neal = false;
    $scope.checkboxModel.sydney = false;
  }; //closes cancelTask function

}]);