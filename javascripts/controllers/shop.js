app.controller("ShopCtrl", ["$scope", "$http", "$firebaseObject", "$location",
  function($scope, $http, $firebaseObject, $location) {
    $scope.page = "Shopping List";
    $scope.items = [];

    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/items");
    var items = $firebaseObject(ref); 
    var uid = ref.getAuth().uid;
    items.$bindTo($scope, "items");
     
    // move from buy to bought
    $scope.moveItem = function(key, item) {
    ref.child(key).child('purchased').set(true);
    }; 

    // remove task from firebase
    $scope.removeItem = function(key, item) {
      delete $scope.items[key];
    };
 
  // create and add a new task to the firebase
  $scope.addItem = function() {
    var category = $scope.checkboxModel;
    // retrieve object values
    var whichIsIt = [];
    
    // loop over checkboxes to see who was assigned the task
    angular.forEach(category, function(value, key) {
      if (category[key] !== false) {
        this.push(value);
      }
    }, whichIsIt); 
    
    var newItem = {
      // uid: uid,
      name: $("#iName").val(),
      category: whichIsIt,
      purchased: false,
    }; console.log("newItem", newItem);


    $.ajax({
      url: "https://8sfamily-calendar.firebaseio.com/items.json",
      method: "POST",
      data: JSON.stringify(newItem)
    }).done(function(){

    }).fail(function(xhr, status, error){

    });

    // clear fields after storing task to firebase
    $('#itemInput').find('input:text, input:password, select, textarea').val('');
    $('#grocery').not(this).prop('checked', false);
    $('#misc').not(this).prop('checked', false);
    

  }; //closes $scope.addTask 
   

  // enable selection of misc or grocery, but not both
  $("#misc").on('change', function(){ 
    $('#grocery').not(this).prop('checked', false);
  });
  $("#grocery").on('change', function(){ 
    $('#misc').not(this).prop('checked', false);
  });

  // set value of misc to false if grocery is selected
  $scope.updateGrocery = function() {
    $scope.checkboxModel.misc = false;
  };

  // set the value of grocery to false if misc is selected  
  $scope.updateMisc = function() {
    $scope.checkboxModel.grocery = false;
  }; 

  // clear everything if input is started but canceled
  $scope.cancelItem = function() {
    $('#itemInput').find('input:text, input:password, select, textarea').val('');
    $('#grocery').not(this).prop('checked', false);
    $('#misc').not(this).prop('checked', false);
    $scope.checkboxModel.misc = false;
    $scope.checkboxModel.grocery = false;

  }; //closes cancelItem function

}]);