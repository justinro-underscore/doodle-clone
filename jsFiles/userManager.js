let users = {};
let currentUser = {}; //maybe change where the currentUser is being instantiated

//Checks if users are stored in localStorage else reloads users from google sheets
if (localStorage.getItem("users") == null) {
  loadUsers();
} else {
  users = JSON.parse(localStorage.getItem("users"));
}

/**
 * Loads users from google spreadsheet via Google charts api
 * @return none
 */
function loadUsers() {
  users = [];
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
}

/**
 * returns user based on username
 * @param  {String} username username
 * @return {User}          user object
 */
function getUser(username) {
  return (users[username]);
}

/**
 * Validate user login with users object
 * @param  {String} username username to be validated
 * @param  {String} password password to be validated
 * @return {boolean}          returns true if valid user credentials were entered
 */
function validateLogin(username, password) {
  let loginUser = getUser(username);
  if (loginUser != null) {
    if (loginUser.password == password) {
      localStorage.setItem("currentUser", JSON.stringify(loginUser));
      return true;
    }
  }
  return false;
}

/**
 * Gets current user from localStorage
 * @return {User} returns user object representing current user
 */
function getCurrUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

/**
 * Creates a new user
 * @return none
 */
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
  // Tell user that the new user was created
  let page = document.getElementById("createUserHTML");
  page.innerHTML = "<h1><br>User \"" + inputUsername + "\" successfully created!<br>Please wait a few seconds before <a href='index.html'>clicking here</a> to go back to the login page!</h1>";
}

/**
 * Directs user to home page if login is successful
 * @param  {Event} event event object of form
 * @return none
 */
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

/**
 * Checks current user's admin status
 * @return none
 */
function checkAdminStatus() {
    return getCurrUser().isAdmin;
}
