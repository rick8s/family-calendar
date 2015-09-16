define(["jquery", "firebase"], 
  function($, _firebase) {

    var ref = new Firebase("https://8sfamily-calendar.firebaseio.com/");
    ref.authWithPassword({
      "email": "",
      "password": ""
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

}); //closes line 1-2


//     var ref = new Firebase("https://8sfamily-calendar.firebaseio.com");
// ref.authWithOAuthPopup("twitter", function(error, authData) {
//   if (error) {
//     console.log("Authentication Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });