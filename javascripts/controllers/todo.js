app.controller("TodoCtrl", ["$scope", "$http", "$firebaseObject",
  function($scope, $http, $firebaseObject) {
  // $scope.title = "8sFamily Task List";
    $scope.tasks = [];

    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/");
    
    var uid = ref.getAuth().uid;
      
    $http.get('https://8sfamily-calendar.firebaseio.com/.json').success(function(data) {
      var tasks = data.tasks;

      angular.forEach(tasks, function(tasks, key) {  
        this.push(tasks); 
      }, $scope.tasks);console.log("$scope.tasks: ", $scope.tasks);
    });

    

      

    // var populateTaskList = function(fb){
    //   $scope.data = fb;
    //   $scope.tasks = $scope.data.tasks;

    //   // angular.forEach(tasks, function(tasks, key) {
    //   //     title: task.title,
    //   //     who: task.who,
    //   //     firebaseId: key       
    //   // });  
    //   console.log("$scope.tasks: ", $scope.tasks);
    // };
  // $scope.todos = [
  //   { name: "Mow the lawn", complete: "incomplete" },
  //   { name: "Cut the grass", complete: "complete" },
  //   { name: "Kill the ants", complete: "incomplete" },
  //   { name: "Trim the weeds", complete: "complete" }
  // ];

  // $scope.killTodo = function(todo) {
  // // Do you see the PFM here of full object comparison?
  // var todoIndex = $scope.todos.indexOf(todo); 

  //   if (todoIndex >= 0) {
  //     $scope.todos.splice(todoIndex, 1);
  //   }
  // };

  
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
    }; console.log("newTask", newTask);

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