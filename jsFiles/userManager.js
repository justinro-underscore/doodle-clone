let users = {};

if (localStorage.getItem("users") == null) {
    loadUsers();
} else {
    users = JSON.parse(localStorage.getItem("users"));
}

 let currentUser = {}; //maybe change where the currentUser is being instantiated

 let loadUsers = () => {
//      let users = {};
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
       
       localStorage.setItem("users", JSON.stringify(users));
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
       document.getElementById("createUserErrorMessage").innerHTML = "You need a username";
     return false;
   }
   if (inputPassword === "") {
     document.getElementById("createUserErrorMessage").innerHTML = "You need a password";
     return false;
   }
   if ($('#isAdmin').is(':checked')) {
     inputIsAdmin = true;
   }
   //make sure the usename isn't already taken
   if (getUser(inputUsername) != undefined) {
     document.getElementById("createUserErrorMessage").innerHTML = "The username is already taken";
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
   //go back to the login page after successful create user
   location.href = 'index.html';
 }

 function login(event) {
   event.preventDefault();

   let inputUsername = document.getElementById("username").value;
   let inputPassword = document.getElementById("password").value;

   if (validateLogin(inputUsername, inputPassword)) {
     window.location.href = 'home.html';
   } else {
       document.getElementById("loginErrorMessage").innerHTML = "Incorrect username/password";
   }
 }
