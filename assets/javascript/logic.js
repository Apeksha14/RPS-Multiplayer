/* global moment firebase */
// Initialize Firebase
var config = {
    
    apiKey: "AIzaSyAUGUKecUauTUz9s4mxb-o2-HMjIX7L4nE",
    authDomain: "rockpaper-project.firebaseapp.com",
    databaseURL: "https://rockpaper-project.firebaseio.com",
    storageBucket: "rockpaper-project.appspot.com",
    messagingSenderId: "285353253842"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(someoneNew) {
	//console.log("connectedRef");
	//console.log(someoneNew.val());
  // If they are connected..
  if (someoneNew.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }

});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {
	//console.log("connectionsRef "+connectionsRef);

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#click-value").html(snap.numChildren());
  //console.log(snap.numChildren());
  $("#name2").text(snap.numChildren());
  $("#wait2").css("display","none");
  $("#player2-name").css("display","block");});

// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// Set Initial Counter
var initialValue = 100;
var clickCounter = initialValue;

// At the initial load, get a snapshot of the current data.
database.ref("players/").on("value", function(snapshot) {
	
  console.log("snapshot1 "+ snapshot.val().player1.name);

  $("#player1-name").css("display","block");
  // Change the html to reflect the initial value.
  $("#name1").html(snapshot.val().player1.name);
  $("#wait1").css("display","none");

  // Change the clickcounter to match the data in the database
  //player1 = snapshot.val().player1;

  // Log the value of the clickCounter
  //console.log("clickCounter"+clickCounter);

  // Change the HTML Value
  //$("#click-value").html(clickCounter);

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the click-button
var clickCount = 0;
 
$("#submit-name").on("click",function(event,snapshot){
  // Reduce the clickCounter by 1
  event.preventDefault();
  
  var player1 = $("#players-name").val().trim();
  clickCount++;
  if(clickCount === 2)
  var player2 = $("#players-name").val().trim();

  var initialWins = 0;
  var initialLosses = 0;

  console.log("player1 "+player1);
  console.log("player2"+player2);

  $("#name1").text(player1);
  $("#wait1").css("display","none");
  $("#player1-name").css("display","block");

	// Save new value to Firebase
  
  database.ref("players/").set({
    player1:{
    	name:player1,
    	wins:0,
    	losses:0
	}
});

});
// Whenever a user clicks the restart button
/*$("#restart-button").on("click", function() {

  // Set the clickCounter back to initialValue
  clickCounter = initialValue;

  // Save new value to Firebase
  database.ref("/clicks").set({
    clickCount: clickCounter
  });

  // Log the value of clickCounter
  console.log(clickCounter);

  // Change the HTML Values
  $("#click-value").html(clickCounter);
});*/
