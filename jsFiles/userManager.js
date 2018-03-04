 let users = {};

 let currentUser = {}; //maybe change where the currentUser is being instantiated

 let loadUsers = () => {
   google.charts.load('current', {
     packages: ['corechart', 'table', 'sankey']
   });

   // Set a callback to run when the Google Visualization API is loaded.
   google.charts.setOnLoadCallback(drawChart);

   function drawChart() {
     let query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1L3BWW7stFlYas5xWW9hYDcXEImqOLKXyyU8H7OztyMw/edit#gid=0");
     query.send(handleQueryResponse);
   }

   function handleQueryResponse(response) {
     let data = response.getDataTable();
     let rows = data.getNumberOfRows();

     for (let i = 0; i < rows; i++) {
       let user = JSON.parse(data.getValue(i, 2));
       users[user.username] = user;
     }
   }
 };

 function addUserToUsers(userInfo) {
   users[userInfo.username] = userInfo;
 }

 function getUser(username) {
   return (users[username]);
 }

 function validateLogin(username, password) {
   let loginUser = getUser(username);
   if (loginUser != null) {
     if (loginUser.password == password) {
       currentUser = loginUser;
       return true;
     }
   }
   return false;
 }

 function createUser() {
   "use strict";
   let inputUsername = document.getElementById("username").value;
   let inputPassword = document.getElementById("password").value;
   let inputIsAdmin = false;
   //make sure there is a username and password
   if (inputUsername === "") {
     alert("You need a username");
     return false;
   }
   if (inputPassword === "") {
     alert("You need a password");
     return false;
   }
   if ($('#isAdmin').is(':checked')) {
     inputIsAdmin = true;
   }
   //make sure the usename isn't already taken
   if (getUser(inputUsername) != undefined) {
     alert("The username is already taken");
     return false;
   }
   //create user object
   let inputUserObject = {
     username: inputUsername,
     password: inputPassword,
     isAdmin: inputIsAdmin
   };
   //post it to the google sheets
   postUser(inputUserObject);
   //tell the user that the account was created
   alert("User " + inputUsername + " created!");
   //go back to the login page after successful create user
   location.href = 'login.html';
 }

 function login(event) {
   event.preventDefault();

   let inputUsername = document.getElementById("username").value;
   let inputPassword = document.getElementById("password").value;

   if (validateLogin(inputUsername, inputPassword)) {
     window.location.href = 'home.html';
   } else {
     alert("Incorrect username/password");
   }
 }
